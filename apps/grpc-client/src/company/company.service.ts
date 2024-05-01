import { Company } from '@agency-os/class';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepo: Repository<CompanyEntity>,
  ) {}

  async create(createCompanyRequestDto: Company.CreateCompanyRequestDto) {
    const company = this.companyRepo.create(createCompanyRequestDto);
    return await this.companyRepo.save(company);
  }

  async findAll() {
    const companys = await this.companyRepo.find();
    return { companys };
  }

  async findOne(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    const { id } = findOneCompanyRequestDto;
    const company = await this.companyRepo.findOne({ where: { id } });
    if (company && company !== undefined) {
      return company;
    }
    throw new NotFoundException(`company not found for id ${id}`);
  }

  async update(
    id: string,
    updateCompanyRequestDto: Company.UpdateCompanyRequestDto,
  ) {
    const company = await this.findOne({ id });
    if (company && company !== undefined) {
      return await this.companyRepo.save(company, {
        data: updateCompanyRequestDto,
      });
    }
    throw new NotFoundException(`company not found for id ${id}`);
  }

  async remove(findOneCompanyRequestDto: Company.FindOneCompanyRequestDto) {
    const { id } = findOneCompanyRequestDto;
    const company = await this.findOne({ id });
    if (company && company !== undefined) {
      return await this.companyRepo.remove(company);
    }
    throw new NotFoundException(`company not found for id ${id}`);
  }
}
