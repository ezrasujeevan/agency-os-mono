import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '@agency-os/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';
import { UserProto } from '@agency-os/proto';
import { UpdateUserRequestDto } from '@agency-os/common/dist/user/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
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
  ): Promise<UserProto.User> {
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
    updateUserDto: UpdateUserRequestDto,
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
}
