import { UserService } from './user.service';
import { User } from '@agency-os/proto';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): User.User;
    findAllUser(): User.Users;
    findOneUserbyId(findOneUserDto: FindOneUserDto): User.User;
    findOneUserByEmail(findOneUserDto: FindOneUserDto): User.User;
    updateUser(updateUserDto: UpdateUserDto): User.User;
    removeUser(findOneUserDto: FindOneUserDto): User.User;
}
