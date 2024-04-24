import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProto } from '@agency-os/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { Company } from '@agency-os/class';
import { Metadata } from '@grpc/grpc-js';
import { GRPC } from 'src/constants';

@Injectable()
export class CompanyService implements OnModuleInit {
  private companyService: ClientProto.CompanyServiceClient;
  constructor(@Inject(GRPC.CLIENT_SERVICE) private companyGrpc: ClientGrpc) {}

  onModuleInit() {
    this.companyService =
      this.companyGrpc.getService<ClientProto.CompanyServiceClient>(
        ClientProto.COMPANY_SERVICE_NAME,
      );
  }

  create(createCompanyRequestDto: Company.CreateCompanyRequestDto) {
    return this.companyService.createCompany(createCompanyRequestDto);
  }

  findAll({}, metadata?: Metadata) {
    return this.companyService.findAllCompany({}, metadata);
  }

  findOne(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    return this.companyService.findOneCompany(findOneCompanyRequestDto);
  }

  update(id: string, updateCompanyRequestDto: Company.UpdateCompanyRequestDto) {
    const company = this.findOne({ id });
    if (company && company !== undefined) {
      updateCompanyRequestDto = { ...updateCompanyRequestDto, id };
      return this.companyService.updateCompany(updateCompanyRequestDto);
    }
  }

  remove(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    return this.companyService.removeCompany(findOneCompanyRequestDto);
  }
}
