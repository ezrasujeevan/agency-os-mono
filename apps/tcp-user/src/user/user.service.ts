import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from '@agency-os/class';
import { UserEntity } from './user.entity';

import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger: Logger;
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async create(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    const user = await this.userRepo.createUser(createUserRequestDto);
    if (user instanceof UserEntity) {
      return {
        user,
        status: HttpStatus.CREATED,
      };
    } else if (user instanceof Error) {
      return {
        error: user.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async findAll({}): Promise<User.UserResponseDto> {
    const user = await this.userRepo.findAll();
    if (Array.isArray(user) && user.every((u) => u instanceof UserEntity)) {
      return { user, status: HttpStatus.OK };
    } else {
      return { error: 'User not found', status: HttpStatus.NOT_FOUND };
    }
  }

  async findOneById(
    findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto,
  ): Promise<User.UserResponseDto> {
    const user = await this.userRepo.findOneById(findOneUserByIdRequestDto);
    if (user instanceof UserEntity) {
      return { user, status: HttpStatus.OK };
    } else {
      return { error: 'User not found', status: HttpStatus.NOT_FOUND };
    }
  }

  async findOneByEmail(
    findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto,
  ): Promise<User.UserResponseDto> {
    const user = await this.userRepo.findOneByEmail(
      findOneUserByEmailRequestDto,
    );
    if (user instanceof UserEntity) {
      return { user, status: HttpStatus.OK };
    } else if (user === null) {
      return { error: 'User not found', status: HttpStatus.NOT_FOUND };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async update(
    updateUserRequestDto: User.UpdateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    const user = this.userRepo.update(updateUserRequestDto);
    if (user instanceof UserEntity) {
      return {
        user,
        status: HttpStatus.OK,
      };
    } else if (user instanceof Error) {
      return {
        error: user.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async remove(
    findOneUserDto: User.FindOneUserByIdRequestDto,
  ): Promise<User.UserResponseDto> {
    const user = this.userRepo.remove(findOneUserDto);
    if (user instanceof UserEntity) {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    } else if (user instanceof Error) {
      return {
        error: user.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async register(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    const user = await this.userRepo.findOneByEmail({
      email: createUserRequestDto.email,
    });
    if (user) {
      return {
        error: ['user already exists'],
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      const newUser = await this.userRepo.createUser(createUserRequestDto);
      if (newUser instanceof UserEntity) {
        return { status: HttpStatus.CREATED };
      } else {
        return {
          error: newUser.message,
          status: HttpStatus.BAD_REQUEST,
        };
      }
    }
  }

  async login(
    loginUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    const user = await this.userRepo.login(loginUserRequestDto);
    if (user instanceof UserEntity) {
      const { id, email } = user;
      const token = await this.jwtService.signAsync({ id, email });
      const refreshToken = await this.jwtService.signAsync(
        { id, email },
        { expiresIn: '7d' },
      );
      return {
        token,
        status: HttpStatus.OK,
        userId: user.id,
        refreshToken,
      };
    } else if (user instanceof Error) {
      return {
        error: user.message,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    return { status: HttpStatus.CONFLICT };
  }

  async validate({
    token,
  }: User.ValidateUserRequestDto): Promise<User.ValidateUserResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepo.findOneById({ id: payload['id'] });
      if (payload && user) {
        return {
          status: HttpStatus.OK,
          userId: user.id,
        };
      }
    } catch (error) {
      return { error: error, status: HttpStatus.UNAUTHORIZED };
    }
    return {
      error: ['invalid token'],
      status: HttpStatus.UNAUTHORIZED,
    };
  }

  async refreshToken(
    refreshTokenUserRequestDto: User.RefreshTokenUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    try {
      const { refreshToken } = refreshTokenUserRequestDto;

      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.userRepo.findOneById({ id: payload['id'] });
      if (payload && user) {
        const { id, email } = user;
        const token = await this.jwtService.signAsync({ id, email });
        const refreshToken = await this.jwtService.signAsync(
          { id, email },
          { expiresIn: '7d' },
        );
        return {
          status: HttpStatus.OK,
          userId: user.id,
          refreshToken,
          token,
        };
      }
    } catch (error) {
      return {
        error: error,
        status: HttpStatus.UNAUTHORIZED,
      };
    }
    return {
      error: 'invalid token',
      status: HttpStatus.BAD_REQUEST,
    };
  }
}
