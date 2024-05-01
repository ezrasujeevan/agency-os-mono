import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Company } from '@agency-os/class';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ClientAuthGuard } from '@agency-os/auth';
import { CompanyService } from './company.service';

@ApiTags('compnay')
@ApiBearerAuth()
@UseGuards(ClientAuthGuard)
@Controller('compnay')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Company Created', type: Company.Company })
  create(@Body() createCompanyRequestDto: Company.CreateCompanyRequestDto) {
    return this.companyService.create(createCompanyRequestDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll({});
  }

  @ApiQuery({
    name: 'id',
    type: String,
    description: 'Find company By Id',
    required: false,
  })
  @Get('find')
  findOne(@Query('id') id: string) {
    return this.companyService.findOne({ id });
  }

  @ApiQuery({
    name: 'id',
    type: String,
    description: 'Find company By Id',
    required: false,
  })
  @Delete()
  remove(@Query('id') id: string) {
    return this.companyService.remove({ id });
  }
}
