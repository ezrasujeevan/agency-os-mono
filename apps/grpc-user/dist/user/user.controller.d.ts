import { UserService } from './user.service';
import { User } from '@agency-os/proto';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User.User>;
    findAllUser(): Promise<User.Users>;
    findOneUserbyId(findOneUserDto: FindOneUserDto): Promise<User.User>;
    findOneUserByEmail(findOneUserDto: FindOneUserDto): Promise<User.User>;
    updateUser(updateUserDto: UpdateUserDto): Promise<User.User>;
    removeUser(findOneUserDto: FindOneUserDto): Promise<User.User>;
}
