import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@agency-os/class';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    this.logger = new Logger(UserRepository.name);
  }

  async createUser(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<UserEntity | Error> {
    try {
      const { password, ...rest } = createUserRequestDto;
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepo.create({
        password: encryptedPassword,
        ...rest,
      });
      this.logger.verbose(`createUser: ${JSON.stringify(user)}`);
      return await this.userRepo.save(user);
    } catch (error: Error | any) {
      this.logger.error(`createUser: ${error.message}`);
      return error;
    }
  }

  async findAll(): Promise<UserEntity[] | null> {
    const users = await this.userRepo.find({});
    this.logger.verbose(`findAll: ${JSON.stringify(users)}`);
    return users;
  }

  async findOneById({
    id,
  }: User.FindOneUserByIdRequestDto): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    this.logger.verbose(`findOneById: ${JSON.stringify(user)}`);
    return user;
  }

  async findOneByEmail({
    email,
  }: User.FindOneUserByEmailRequestDto): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    this.logger.verbose(`findOneByEmail: ${JSON.stringify(user)}`);
    return user;
  }

  async update(
    updateUserDto: User.UpdateUserRequestDto,
  ): Promise<UserEntity | Error> {
    try {
      const user = await this.findOneById({ id: updateUserDto.id });
      if (user) {
        if (updateUserDto.password) {
          updateUserDto.password = await bcrypt.hash(
            updateUserDto.password,
            10,
          );
        }
        this.logger.verbose(`User found ${JSON.stringify(user)}`);
        const updatedUser = await this.userRepo.merge(user, updateUserDto);
        this.logger.verbose(`User updated ${JSON.stringify(updatedUser)}`);
        return await this.userRepo.save(updatedUser);
      }
      throw new NotFoundException(`User not found by id ${updateUserDto.id}`);
    } catch (error: Error | any) {
      this.logger.error(`update: ${error.message}`);
      return error;
    }
  }

  async remove(
    findOneUserDto: User.FindOneUserByIdRequestDto,
  ): Promise<UserEntity | Error> {
    try {
      const user = await this.userRepo.findOne({
        where: { id: findOneUserDto.id },
      });
      if (user) {
        this.logger.verbose(`User found ${JSON.stringify(user)}`);
        return await this.userRepo.softRemove(user);
      }
      throw new NotFoundException(`user not found by id ${findOneUserDto.id}`);
    } catch (error: Error | any) {
      this.logger.error(`remove: ${error.message}`);
      return error;
    }
  }
  //_------------------------------------------------------------------------------------------------------------

  async login(
    LoginUserRequestDto: User.LoginUserRequestDto,
  ): Promise<UserEntity | Error> {
    const { email, password } = LoginUserRequestDto;
    const user = await this.userRepo.findOne({
      where: { email },
      select: ['password', 'id', 'email'],
    });
    if (user && user !== undefined) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
    }
    return new Error('invalid email or password');
  }
}
