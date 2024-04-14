/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
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
  registerUser(request: CreateUserRequest, metadata?: Metadata): Observable<RegisterUserResponse>;

  loginUser(request: LoginUserRequest, metadata?: Metadata): Observable<LoginUserResponse>;

  validateUser(request: ValidateUserRequest, metadata?: Metadata): Observable<ValidateUserResponse>;

  createUser(request: CreateUserRequest, metadata?: Metadata): Observable<User>;

  findAllUser(request: Empty, metadata?: Metadata): Observable<Users>;

  findOneUserbyId(request: FindOneUserByIdRequest, metadata?: Metadata): Observable<User>;

  findOneUserByEmail(request: FindOneUserByEmailRequest, metadata?: Metadata): Observable<User>;

  updateUser(request: UpdateUserRequest, metadata?: Metadata): Observable<User>;

  removeUser(request: FindOneUserByIdRequest, metadata?: Metadata): Observable<User>;
}

export interface UserServiceController {
  registerUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Promise<RegisterUserResponse> | Observable<RegisterUserResponse> | RegisterUserResponse;

  loginUser(
    request: LoginUserRequest,
    metadata?: Metadata,
  ): Promise<LoginUserResponse> | Observable<LoginUserResponse> | LoginUserResponse;

  validateUser(
    request: ValidateUserRequest,
    metadata?: Metadata,
  ): Promise<ValidateUserResponse> | Observable<ValidateUserResponse> | ValidateUserResponse;

  createUser(request: CreateUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;

  findAllUser(request: Empty, metadata?: Metadata): Observable<Users>;

  findOneUserbyId(request: FindOneUserByIdRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;

  findOneUserByEmail(request: FindOneUserByEmailRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserByIdRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;
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
