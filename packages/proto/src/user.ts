/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

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

export const USER_PACKAGE_NAME = "user";

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

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findAllUser",
      "findOneUserbyId",
      "findOneUserByEmail",
      "updateUser",
      "removeUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
