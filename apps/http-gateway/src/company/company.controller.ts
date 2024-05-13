import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@agency-os/class';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('company', 'tcp', 'tcp/company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() create: Company.CreateCompanyRequestDto) {
    return await this.companyService.createCompany(create);
  }

  @ApiQuery({ name: 'code', required: false })
  @Get()
  async findAll(@Query('code') code?: string) {
    if (code) {
      return await this.companyService.findOneCompanyByCode({ code });
    }
    return await this.companyService.findAllCompany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOneCompanyById({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() update: Company.UpdateCompanyRequestDto,
  ) {
    update.id = id;
    return await this.companyService.updateCompany(update);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companyService.removeCompany({ id });
  }
}
