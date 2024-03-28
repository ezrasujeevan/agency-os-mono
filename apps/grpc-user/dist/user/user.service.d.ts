import { User } from '@agency-os/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserProto } from '@agency-os/proto';
import { UpdateUserRequestDto } from '@agency-os/common/dist/user/user';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    create(createUserDto: User.CreateUserRequestDto): Promise<User.User>;
    findAll({}: {}): Promise<User.User[]>;
    findOneById(findOneUserDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    findOneByEmail(findOneUserDto: User.FindOneUserByEmailRequestDto): Promise<UserProto.User>;
    update(id: string, updateUserDto: UpdateUserRequestDto): Promise<User.User>;
    remove(findOneUserDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
}
