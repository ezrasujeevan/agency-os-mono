/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface RegisterUserResponse {
  status: number;
  error: string[];
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateUserRequest {
  token: string;
}

export interface ValidateUserResponse {
  status: number;
  error: string[];
  userId: string;
}

export interface UpdateUserRequest {
  id: string;
}

export interface FindOneUserByIdRequest {
  id: string;
}

export interface FindOneUserByEmailRequest {
  email: string;
}

export interface Users {
  users: User[];
}

export interface Empty {
}

export interface CreateUserRequest {
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
  registerUser(request: CreateUserRequest): Observable<RegisterUserResponse>;

  loginUser(request: LoginUserRequest): Observable<LoginUserResponse>;

  validateUser(request: ValidateUserRequest): Observable<ValidateUserResponse>;

  createUser(request: CreateUserRequest): Observable<User>;

  findAllUser(request: Empty): Observable<FindOneUserByEmailRequest>;

  findOneUserbyId(request: FindOneUserByIdRequest): Observable<User>;

  findOneUserByEmail(request: FindOneUserByEmailRequest): Observable<User>;

  updateUser(request: UpdateUserRequest): Observable<User>;

  removeUser(request: FindOneUserByIdRequest): Observable<User>;
}

export interface UserServiceController {
  registerUser(
    request: CreateUserRequest,
  ): Promise<RegisterUserResponse> | Observable<RegisterUserResponse> | RegisterUserResponse;

  loginUser(request: LoginUserRequest): Promise<LoginUserResponse> | Observable<LoginUserResponse> | LoginUserResponse;

  validateUser(
    request: ValidateUserRequest,
  ): Promise<ValidateUserResponse> | Observable<ValidateUserResponse> | ValidateUserResponse;

  createUser(request: CreateUserRequest): Promise<User> | Observable<User> | User;

  findAllUser(request: Empty): Observable<FindOneUserByEmailRequest>;

  findOneUserbyId(request: FindOneUserByIdRequest): Promise<User> | Observable<User> | User;

  findOneUserByEmail(request: FindOneUserByEmailRequest): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserRequest): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserByIdRequest): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "registerUser",
      "loginUser",
      "validateUser",
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
