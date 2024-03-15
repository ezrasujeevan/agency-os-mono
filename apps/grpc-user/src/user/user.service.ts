import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';
import { randomUUID } from 'crypto';
import { User } from '@agency-os/proto';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly users: User.User[] = [];

  onModuleInit() {
    for (let index = 0; index < 100; index++) {
      this.create({ email: randomUUID(), password: randomUUID() });
    }
  }

  create(createUserDto: CreateUserDto): User.User {
    const user: User.User = {
      ...createUserDto,
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): User.Users {
    return { users: this.users };
  }

  findOne(findOneUserDto: FindOneUserDto): User.User {
    const user = this.users.find((user) => user.id === findOneUserDto.id);
    if (user !== undefined) {
      return user;
    }
    throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
  }

  update(id: string, updateUserDto: UpdateUserDto): User.User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }
    throw new NotFoundException(`user not found by id ${id}`);
  }

  remove(findOneUserDto: FindOneUserDto): User.User {
    const userIndex = this.users.findIndex(
      (user) => user.id === findOneUserDto.id,
    );
    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
  }
}
