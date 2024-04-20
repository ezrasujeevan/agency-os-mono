import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { Company } from '@agency-os/common';
import { ClientProto } from '@agency-os/proto';

@Controller()
@ClientProto.CompanyServiceControllerMethods()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  createCompany(createCompanyRequestDto: Company.CreateCompanyRequestDto) {
    return this.companyService.create(createCompanyRequestDto);
  }

  findAllCompany({}) {
    return this.companyService.findAll();
  }

  findOneCompany(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    return this.companyService.findOne(findOneCompanyRequestDto);
  }

  updateCompany(updateCompanyRequestDto: Company.UpdateCompanyRequestDto) {
    return this.companyService.update(
      updateCompanyRequestDto.id,
      updateCompanyRequestDto,
    );
  }

  removeCompany(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    return this.companyService.remove(findOneCompanyRequestDto);
  }
}
