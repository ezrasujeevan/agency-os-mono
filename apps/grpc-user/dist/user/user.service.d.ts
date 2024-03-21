import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';
import { User } from '@agency-os/proto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<User.User>;
    findAll(): Promise<User.Users>;
    findOne(findOneUserDto: FindOneUserDto): Promise<User.User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User.User>;
    remove(findOneUserDto: FindOneUserDto): Promise<User.User>;
}
