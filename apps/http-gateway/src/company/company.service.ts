import { Inject, Injectable } from '@nestjs/common';

import { Company } from '@agency-os/class';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(Company.SERVICE_NAME) private readonly companyService: ClientTCP,
  ) {}

  async createCompany(
    create: Company.CreateCompanyRequestDto,
  ): Promise<Company.companyResponseDto> {
    return await firstValueFrom(
      this.companyService.send<
        Company.companyResponseDto,
        Company.CreateCompanyRequestDto
      >(Company.Message.create, create),
    );
  }

  async findOneCompanyById(
    id: Company.FindOneCompanyByIdRequestDto,
  ): Promise<Company.companyResponseDto> {
    return await firstValueFrom(
      this.companyService.send<
        Company.companyResponseDto,
        Company.FindOneCompanyByIdRequestDto
      >(Company.Message.findOneById, id),
    );
  }

  async findOneCompanyByCode(
    code: Company.findOneCompanyByCodeRequestDto,
  ): Promise<Company.companyResponseDto> {
    return await firstValueFrom(
      this.companyService.send<
        Company.companyResponseDto,
        Company.FindOneCompanyByIdRequestDto
      >(Company.Message.findOneByCode, code),
    );
  }

  async findAllCompany(): Promise<Company.companyResponseDto> {
    return await firstValueFrom(
      this.companyService.send<Company.companyResponseDto, object>(
        Company.Message.findAll,
        {},
      ),
    );
  }

  async updateCompany(
    update: Company.UpdateCompanyRequestDto,
  ): Promise<Company.companyResponseDto> {
    return await firstValueFrom(
      this.companyService.send<
        Company.companyResponseDto,
        Company.UpdateCompanyRequestDto
      >(Company.Message.update, update),
    );
  }

  async removeCompany(
    id: Company.FindOneCompanyByIdRequestDto,
  ): Promise<Company.companyResponseDto> {
    return await firstValueFrom(
      this.companyService.send<
        Company.companyResponseDto,
        Company.FindOneCompanyByIdRequestDto
      >(Company.Message.delete, id),
    );
  }
}
