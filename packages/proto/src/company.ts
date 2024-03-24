/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "company";

export interface Empty {
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
}

export const COMPANY_PACKAGE_NAME = "company";

export interface ClientServiceClient {
  createCompany(request: CreateCompanyRequest, metadata?: Metadata): Observable<Company>;

  findAllCompany(request: Empty, metadata?: Metadata): Observable<Companys>;

  findOneCompany(request: FindOneCompanyRequest, metadata?: Metadata): Observable<Company>;

  updateCompany(request: UpdateCompanyRequest, metadata?: Metadata): Observable<Company>;

  removeCompany(request: FindOneCompanyRequest, metadata?: Metadata): Observable<Company>;
}

export interface ClientServiceController {
  createCompany(request: CreateCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;

  findAllCompany(request: Empty, metadata?: Metadata): Observable<Companys>;

  findOneCompany(request: FindOneCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;

  updateCompany(request: UpdateCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;

  removeCompany(request: FindOneCompanyRequest, metadata?: Metadata): Promise<Company> | Observable<Company> | Company;
}

export function ClientServiceControllerMethods() {
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
