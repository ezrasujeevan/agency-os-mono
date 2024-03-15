import { OnModuleInit } from '@nestjs/common';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';
import { User } from '@agency-os/proto';
export declare class UserService implements OnModuleInit {
    private readonly users;
    onModuleInit(): void;
    create(createUserDto: CreateUserDto): User.User;
    findAll(): User.Users;
    findOne(findOneUserDto: FindOneUserDto): User.User;
    update(id: string, updateUserDto: UpdateUserDto): User.User;
    remove(findOneUserDto: FindOneUserDto): User.User;
}
