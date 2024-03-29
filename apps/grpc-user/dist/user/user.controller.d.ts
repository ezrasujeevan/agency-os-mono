import { Metadata } from '@grpc/grpc-js';
import { UserService } from './user.service';
import { User } from '@agency-os/common';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserRequestDto: User.CreateUserRequestDto): Promise<User.User>;
    findAllUser({}: {}, metadata: Metadata): Promise<{
        users: User.User[];
    }>;
    findOneUserbyId(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    findOneUserByEmail(findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto): Promise<User.User>;
    updateUser(updateUserRequestDto: User.UpdateUserRequestDto): Promise<User.User>;
    removeUser(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    registerUser(createUserRequestDto: User.CreateUserRequestDto): Promise<User.RegisterUserResponseDto>;
    loginUser(loginUserRequestDto: User.LoginUserRequestDto): Promise<User.LoginUserResponceDto>;
    validateUser(validateUserRequestDto: User.ValidateUserRequestDto): Promise<User.ValidateUserResponseDto>;
}
