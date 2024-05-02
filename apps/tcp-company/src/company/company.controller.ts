import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { Company } from '@agency-os/class';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern(Company.Message.create)
  createCompany(@Payload() create: Company.CreateCompanyRequestDto) {
    return this.companyService.createCompany(create);
  }

  @MessagePattern(Company.Message.findAll)
  findAllCompany() {
    return this.companyService.findAllCompany();
  }

  @MessagePattern(Company.Message.findOneById)
  findOneCompanyByID(@Payload() id: Company.FindOneCompanyByIdRequestDto) {
    return this.companyService.findOneCompanyById(id);
  }

  @MessagePattern(Company.Message.findOneByCode)
  findOneCompanyByCode(
    @Payload() code: Company.findOneCompanyByCodeRequestDto,
  ) {
    return this.companyService.findOneCompanyByCode(code);
  }

  @MessagePattern(Company.Message.update)
  updateCompany(@Payload() update: Company.UpdateCompanyRequestDto) {
    return this.companyService.updateCompany(update);
  }

  @MessagePattern(Company.Message.delete)
  removeCompany(@Payload() id: Company.FindOneCompanyByIdRequestDto) {
    return this.companyService.removeCompany(id);
  }
}
