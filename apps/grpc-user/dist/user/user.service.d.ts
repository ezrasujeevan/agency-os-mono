import { User } from '@agency-os/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userRepo;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepo: Repository<UserEntity>, jwtService: JwtService, configService: ConfigService);
    create(createUserDto: User.CreateUserRequestDto): Promise<User.User>;
    findAll({}: {}): Promise<User.User[]>;
    findOneById(findOneUserDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    findOneByEmail(findOneUserDto: User.FindOneUserByEmailRequestDto): Promise<User.User>;
    update(id: string, updateUserDto: User.UpdateUserRequestDto): Promise<User.User>;
    remove(findOneUserDto: User.FindOneUserByIdRequestDto): Promise<User.User>;
    register(createUserRequestDto: User.CreateUserRequestDto): Promise<User.RegisterUserResponseDto>;
    login(createUserRequestDto: User.LoginUserRequestDto): Promise<User.LoginUserResponceDto>;
    validate(validateUserRequestDto: User.ValidateUserRequestDto): Promise<User.ValidateUserResponseDto>;
}
