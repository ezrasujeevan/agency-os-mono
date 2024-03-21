/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: string;
}

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
  firstName?:
    | string
    | undefined;
  /**
   * google.protobuf.Timestamp createdAt = 6;
   * google.protobuf.Timestamp updatedAt = 7;
   * int32 version = 8;
   */
  lastName?: string | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  register(request: CreateUserDto): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  createUser(request: CreateUserDto): Observable<User>;

  findAllUser(request: Empty): Observable<Users>;

  findOneUserbyId(request: FindOneUserDto): Observable<User>;

  findOneUserByEmail(request: FindOneUserDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;
}

export interface UserServiceController {
  register(request: CreateUserDto): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

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
      "register",
      "login",
      "validate",
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
