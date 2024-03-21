import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';
import { randomUUID } from 'crypto';
import { User } from '@agency-os/proto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User.User> {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll(): Promise<User.Users> {
    const users = await this.userRepo.find();

    return { users };
  }

  async findOne(findOneUserDto: FindOneUserDto): Promise<User.User> {
    const { email, id } = findOneUserDto;
    let user;
    if (id) {
      user = await this.userRepo.findOne({ where: { id } });
    } else if (email) {
      user = await this.userRepo.findOne({ where: { email } });
    } else {
      throw new BadRequestException(`Have to send either id or email`);
    }
    if (user !== undefined && user) {
      return user;
    }
    throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User.User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user && user !== undefined) {
      return await this.userRepo.save(user, {
        data: updateUserDto,
      });
    }
    throw new NotFoundException(`user not found by id ${id}`);
  }

  async remove(findOneUserDto: FindOneUserDto): Promise<User.User> {
    const user = await this.userRepo.findOne({
      where: { id: findOneUserDto.id },
    });
    if (user && user !== undefined) {
      return await this.userRepo.remove(user);
    }
    throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
  }
}
