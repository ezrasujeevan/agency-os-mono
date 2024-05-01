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

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() create: Company.CreateCompanyRequestDto) {
    return this.companyService.createCompany(create);
  }

  @ApiQuery({ name: 'code', required: false })
  @Get()
  findAll(@Query('code') code?: string) {
    if (code) {
      return this.companyService.findOneCompanyByCode({ code });
    }
    return this.companyService.findAllCompany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOneCompanyById({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Company.UpdateCompanyRequestDto,
  ) {
    update.id = id;
    return this.companyService.updateCompany(update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.removeCompany({ id });
  }
}
