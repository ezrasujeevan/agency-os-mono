import { Observable } from "rxjs";
export declare const protobufPackage = "user";
export interface UpdateUserDto {
    id: string;
}
export interface FindOneUserDto {
    id?: string | undefined;
    email?: string | undefined;
}
export interface Users {
    users: User[];
}
export interface Empty {
}
export interface CreateUserDto {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}
export interface User {
    id: string;
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}
export declare const USER_PACKAGE_NAME = "user";
export interface UserServiceClient {
    createUser(request: CreateUserDto): Observable<User>;
    findAllUser(request: Empty): Observable<Users>;
    findOneUserbyId(request: FindOneUserDto): Observable<User>;
    findOneUserByEmail(request: FindOneUserDto): Observable<User>;
    updateUser(request: UpdateUserDto): Observable<User>;
    removeUser(request: FindOneUserDto): Observable<User>;
}
export interface UserServiceController {
    createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;
    findAllUser(request: Empty): Observable<Users>;
    findOneUserbyId(request: FindOneUserDto): Promise<User> | Observable<User> | User;
    findOneUserByEmail(request: FindOneUserDto): Promise<User> | Observable<User> | User;
    updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;
    removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}
export declare function UserServiceControllerMethods(): (constructor: Function) => void;
export declare const USER_SERVICE_NAME = "UserService";
