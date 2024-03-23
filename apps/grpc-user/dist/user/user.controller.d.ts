import { UserService } from './user.service';
import { UserProto } from '@agency-os/proto';
import { User } from '@agency-os/common';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserRequestDto: User.CreateUserRequestDto): Promise<User.User>;
    findAllUser({}: {}): Promise<User.Users>;
    findOneUserbyId(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    findOneUserByEmail(findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto): Promise<UserProto.User>;
    updateUser(updateUserRequestDto: User.UpdateUserRequestDto): Promise<User.User>;
    removeUser(findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
}
