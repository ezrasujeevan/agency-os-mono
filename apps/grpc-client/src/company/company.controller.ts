import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { Company } from '@agency-os/common';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern('createCompany')
  create(createCompanyRequestDto: Company.CreateCompanyRequestDto) {
    return this.companyService.create(createCompanyRequestDto);
  }

  @MessagePattern('findAllCompany')
  findAll({}) {
    return this.companyService.findAll();
  }

  @MessagePattern('findOneCompany')
  findOne(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    return this.companyService.findOne(findOneCompanyRequestDto);
  }

  @MessagePattern('updateCompany')
  update(updateCompanyRequestDto: Company.UpdateCompanyRequestDto) {
    return this.companyService.update(
      updateCompanyRequestDto.id,
      updateCompanyRequestDto,
    );
  }

  @MessagePattern('removeCompany')
  remove(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    return this.companyService.remove(findOneCompanyRequestDto);
  }
}
