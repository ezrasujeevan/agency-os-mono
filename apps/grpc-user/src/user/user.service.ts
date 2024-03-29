import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@agency-os/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error, log } from 'console';
import { UserProto } from '@agency-os/proto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: User.CreateUserRequestDto): Promise<User.User> {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll({}): Promise<User.User[]> {
    const users = await this.userRepo.find({});
    log(users);
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
    return new User.RegisterUserResponseDto();
  }

  async login(
    createUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponceDto> {
    const { email, password } = createUserRequestDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && user !== undefined) {
      if (user.password == password) {
        const token = await this.jwtService.signAsync({ id: user.id, email });
        return { token, error: [], status: HttpStatus.OK };
      }
    }
    throw new UnauthorizedException();
  }

  async validate(
    validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    try {
      const { token } = validateUserRequestDto;

      const payload = await this.jwtService.verifyAsync(token);
      if (payload && payload !== undefined) {
        return {
          error: [],
          status: HttpStatus.ACCEPTED,
          userId: payload['id'],
        };
      }
    } catch (error) {
      return { error: error, status: HttpStatus.UNAUTHORIZED, userId: '' };
    } finally {
      return { error: [], status: HttpStatus.BAD_REQUEST, userId: '' };
    }
  }
}
