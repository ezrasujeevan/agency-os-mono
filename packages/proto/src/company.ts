/* eslint-disable */
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
  createCompany(request: CreateCompanyRequest): Observable<Company>;

  findAllCompany(request: Empty): Observable<Companys>;

  findOneCompany(request: FindOneCompanyRequest): Observable<Company>;

  updateCompany(request: UpdateCompanyRequest): Observable<Company>;

  removeCompany(request: FindOneCompanyRequest): Observable<Company>;
}

export interface ClientServiceController {
  createCompany(request: CreateCompanyRequest): Promise<Company> | Observable<Company> | Company;

  findAllCompany(request: Empty): Observable<Companys>;

  findOneCompany(request: FindOneCompanyRequest): Promise<Company> | Observable<Company> | Company;

  updateCompany(request: UpdateCompanyRequest): Promise<Company> | Observable<Company> | Company;

  removeCompany(request: FindOneCompanyRequest): Promise<Company> | Observable<Company> | Company;
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
