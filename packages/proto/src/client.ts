/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "client";

export interface RegisterClientResponse {
  status: number;
  error: string[];
}

export interface LoginClientRequest {
  email: string;
  password: string;
}

export interface LoginClientResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateClientRequest {
  token: string;
}

export interface ValidateClientResponse {
  status: number;
  error: string[];
  clientId: string;
}

export interface UpdateClientRequest {
  id: string;
}

export interface FindOneClientByIdRequest {
  id: string;
}

export interface FindOneClientByEmailRequest {
  email: string;
}

export interface Clients {
  clients: Client[];
}

export interface Empty {
}

export interface CreateClientRequest {
  email: string;
  password: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface Client {
  id: string;
  email: string;
  password: string;
  company: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export const CLIENT_PACKAGE_NAME = "client";

export interface ClientServiceClient {
  registerClient(request: CreateClientRequest): Observable<RegisterClientResponse>;

  loginClient(request: LoginClientRequest): Observable<LoginClientResponse>;

  validateClient(request: ValidateClientRequest): Observable<ValidateClientResponse>;

  createClient(request: CreateClientRequest): Observable<Client>;

  findAllClient(request: Empty): Observable<FindOneClientByEmailRequest>;

  findOneClientbyId(request: FindOneClientByIdRequest): Observable<Client>;

  findOneClientByEmail(request: FindOneClientByEmailRequest): Observable<Client>;

  updateClient(request: UpdateClientRequest): Observable<Client>;

  removeClient(request: FindOneClientByIdRequest): Observable<Client>;
}

export interface ClientServiceController {
  registerClient(
    request: CreateClientRequest,
  ): Promise<RegisterClientResponse> | Observable<RegisterClientResponse> | RegisterClientResponse;

  loginClient(
    request: LoginClientRequest,
  ): Promise<LoginClientResponse> | Observable<LoginClientResponse> | LoginClientResponse;

  validateClient(
    request: ValidateClientRequest,
  ): Promise<ValidateClientResponse> | Observable<ValidateClientResponse> | ValidateClientResponse;

  createClient(request: CreateClientRequest): Promise<Client> | Observable<Client> | Client;

  findAllClient(request: Empty): Observable<FindOneClientByEmailRequest>;

  findOneClientbyId(request: FindOneClientByIdRequest): Promise<Client> | Observable<Client> | Client;

  findOneClientByEmail(request: FindOneClientByEmailRequest): Promise<Client> | Observable<Client> | Client;

  updateClient(request: UpdateClientRequest): Promise<Client> | Observable<Client> | Client;

  removeClient(request: FindOneClientByIdRequest): Promise<Client> | Observable<Client> | Client;
}

export function ClientServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "registerClient",
      "loginClient",
      "validateClient",
      "createClient",
      "findAllClient",
      "findOneClientbyId",
      "findOneClientByEmail",
      "updateClient",
      "removeClient",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ClientService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ClientService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CLIENT_SERVICE_NAME = "ClientService";
