import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@agency-os/class';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.User> {
    const { password, ...rest } = createUserRequestDto;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ password: encryptedPassword, ...rest });
    return await this.userRepo.save(user);
  }

  async findAll({}): Promise<User.User[]> {
    const users = await this.userRepo.find({});
    return users;
  }

  async findOneById(
    findOneUserDto: User.FindOneUserByIdRequestDto,
  ): Promise<User.User> {
    const { id } = findOneUserDto;
    const user = await this.userRepo.findOne({ where: { id } });
    if (user !== undefined && user) {
      return user;
    }
    throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
  }

  async findOneByEmail(
    findOneUserDto: User.FindOneUserByEmailRequestDto,
  ): Promise<User.User> {
    const { email } = findOneUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (user !== undefined && user) {
      return user;
    }
    throw new NotFoundException(
      `user not found by email ${findOneUserDto.email}`,
    );
  }

  async update(
    id: string,
    updateUserDto: User.UpdateUserRequestDto,
  ): Promise<User.User> {
    const user = await this.findOneById({ id });
    if (user && user !== undefined) {
      return await this.userRepo.save(user, {
        data: updateUserDto,
      });
    }
    throw new NotFoundException(`user not found by id ${id}`);
  }

  async remove(
    findOneUserDto: User.FindOneUserByIdRequestDto,
  ): Promise<User.User> {
    const user = await this.userRepo.findOne({
      where: { id: findOneUserDto.id },
    });
    if (user && user !== undefined) {
      return await this.userRepo.remove(user);
    }
    throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
  }

  async register(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.RegisterUserResponseDto> {
    const { email } = createUserRequestDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && user !== undefined) {
      return {
        error: ['user already exists'],
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      await this.create(createUserRequestDto);
      return { error: [], status: HttpStatus.CREATED };
    }
  }

  async login(
    createUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponceDto> {
    const { email, password } = createUserRequestDto;
    const user = await this.userRepo.findOne({
      where: { email },
      select: ['password', 'id'],
    });
    if (user && user !== undefined) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = await this.jwtService.signAsync({ id: user.id, email });
        const refreshToken = await this.jwtService.signAsync(
          { id: user.id, email },
          { expiresIn: '7d' },
        );
        return {
          token,
          error: [],
          status: HttpStatus.OK,
          userId: user.id,
          refreshToken,
        };
      }
    }
    return {
      token: '',
      error: ['invalid email or password'],
      status: HttpStatus.UNAUTHORIZED,
      userId: '',
      refreshToken: '',
    };
  }

  async validate(
    validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    try {
      const { token } = validateUserRequestDto;

      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.findOneById({ id: payload['id'] });
      if (payload && payload !== undefined && user && user !== undefined) {
        return {
          error: [],
          status: HttpStatus.OK,
          userId: user.id,
        };
      }
    } catch (error) {
      return { error: error, status: HttpStatus.UNAUTHORIZED, userId: '' };
    }
    return {
      error: ['invalid token'],
      status: HttpStatus.UNAUTHORIZED,
      userId: '',
    };
  }

  async refreshToken(
    refreshTokenUserRequestDto: User.RefreshTokenUserRequestDto,
  ): Promise<User.LoginUserResponceDto> {
    try {
      const { refreshToken } = refreshTokenUserRequestDto;

      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.findOneById({ id: payload['id'] });
      if (payload && payload !== undefined && user && user !== undefined) {
        const token = await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
        });
        const refreshToken = await this.jwtService.signAsync(
          {
            id: user.id,
            email: user.email,
          },
          { expiresIn: '7d' },
        );
        return {
          error: [],
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
        userId: '',
        refreshToken: '',
        token: '',
      };
    }
    return {
      error: ['invalid token'],
      status: HttpStatus.BAD_REQUEST,
      userId: '',
      refreshToken: '',
      token: '',
    };
  }
}
