import { Metadata } from '@grpc/grpc-js';
import { UserService } from './user.service';
import { UserProto } from '@agency-os/proto';
import { User } from '@agency-os/common';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserRequestDto: User.CreateUserRequestDto): Promise<User.User>;
    findAllUser({}: {}, metadata: Metadata): Promise<User.Users>;
    findOneUserbyId(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    findOneUserByEmail(findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto): Promise<UserProto.User>;
    updateUser(updateUserRequestDto: User.UpdateUserRequestDto): Promise<User.User>;
    removeUser(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    registerUser(createUserRequestDto: User.CreateUserRequestDto): Promise<void>;
    loginUser(createUserRequestDto: User.CreateUserRequestDto): Promise<void>;
    validateUser(createUserRequestDto: User.CreateUserRequestDto): Promise<void>;
}
