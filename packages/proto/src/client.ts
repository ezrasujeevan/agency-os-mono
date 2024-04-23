/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "client";

export interface RefreshTokenClientRequest {
  refreshToken: string;
}

export interface Empty {
}

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
  refreshToken: string;
  clientId: string;
}

export interface ValidateClientRequest {
  token: string;
}

export interface ValidateClientResponse {
  status: number;
  error: string[];
  clientId: string;
  compnayId: string;
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

export interface CreateClientRequest {
  email: string;
  password: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  company?: Company | undefined;
}

export interface Client {
  id: string;
  email: string;
  password: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  company?: Company | undefined;
}

export interface UpdateCompanyRequest {
  id: string;
}

export interface FindOneCompanyRequest {
  id: string;
}

export interface Companys {
  companys: Company[];
}

export interface CreateCompanyRequest {
  name: string;
  code: string;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  clients: Client[];
}

export const CLIENT_PACKAGE_NAME = "client";

export interface ClientServiceClient {
  registerClient(request: CreateClientRequest, metadata?: Metadata): Observable<RegisterClientResponse>;

  loginClient(request: LoginClientRequest, metadata?: Metadata): Observable<LoginClientResponse>;

  validateClient(request: ValidateClientRequest, metadata?: Metadata): Observable<ValidateClientResponse>;

  refreshTokenClient(request: RefreshTokenClientRequest, metadata?: Metadata): Observable<LoginClientResponse>;

  createClient(request: CreateClientRequest, metadata?: Metadata): Observable<Client>;

  findAllClient(request: Empty, metadata?: Metadata): Observable<FindOneClientByEmailRequest>;

  findOneClientbyId(request: FindOneClientByIdRequest, metadata?: Metadata): Observable<Client>;

  findOneClientByEmail(request: FindOneClientByEmailRequest, metadata?: Metadata): Observable<Client>;

  updateClient(request: UpdateClientRequest, metadata?: Metadata): Observable<Client>;

  removeClient(request: FindOneClientByIdRequest, metadata?: Metadata): Observable<Client>;
}

export interface ClientServiceController {
  registerClient(
    request: CreateClientRequest,
    metadata?: Metadata,
  ): Promise<RegisterClientResponse> | Observable<RegisterClientResponse> | RegisterClientResponse;

  loginClient(
    request: LoginClientRequest,
    metadata?: Metadata,
  ): Promise<LoginClientResponse> | Observable<LoginClientResponse> | LoginClientResponse;

  validateClient(
    request: ValidateClientRequest,
    metadata?: Metadata,
  ): Promise<ValidateClientResponse> | Observable<ValidateClientResponse> | ValidateClientResponse;

  refreshTokenClient(
    request: RefreshTokenClientRequest,
    metadata?: Metadata,
  ): Promise<LoginClientResponse> | Observable<LoginClientResponse> | LoginClientResponse;

  createClient(request: CreateClientRequest, metadata?: Metadata): Promise<Client> | Observable<Client> | Client;

  findAllClient(request: Empty, metadata?: Metadata): Observable<FindOneClientByEmailRequest>;

  findOneClientbyId(
    request: FindOneClientByIdRequest,
    metadata?: Metadata,
  ): Promise<Client> | Observable<Client> | Client;

  findOneClientByEmail(
    request: FindOneClientByEmailRequest,
    metadata?: Metadata,
  ): Promise<Client> | Observable<Client> | Client;

  updateClient(request: UpdateClientRequest, metadata?: Metadata): Promise<Client> | Observable<Client> | Client;

  removeClient(request: FindOneClientByIdRequest, metadata?: Metadata): Promise<Client> | Observable<Client> | Client;
}

export function ClientServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "registerClient",
      "loginClient",
      "validateClient",
      "refreshTokenClient",
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

export interface CompanyServiceClient {
  createCompany(request: CreateCompanyRequest, metadata?: Metadata): Observable<Company>;

  findAllCompany(request: Empty, metadata?: Metadata): Observable<Companys>;

  findOneCompany(request: FindOneCompanyRequest, metadata?: Metadata): Observable<Company>;

  updateCompany(request: UpdateCompanyRequest, metadata?: Metadata): Observable<Company>;

  removeCompany(request: FindOneCompanyRequest, metadata?: Metadata): Observable<Company>;
}

export interface CompanyServiceController {
  createCompany(request: CreateCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;

  findAllCompany(request: Empty, metadata?: Metadata): Observable<Companys>;

  findOneCompany(request: FindOneCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;

  updateCompany(request: UpdateCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;

  removeCompany(request: FindOneCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;
}

export function CompanyServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCompany",
      "findAllCompany",
      "findOneCompany",
      "updateCompany",
      "removeCompany",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CompanyService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CompanyService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMPANY_SERVICE_NAME = "CompanyService";
