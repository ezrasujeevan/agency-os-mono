import { Company } from '@agency-os/class';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyRepository {
  private readonly logger: Logger = new Logger(CompanyRepository.name);
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepo: Repository<CompanyEntity>,
  ) {}

  async createCompany(
    createCompanyRequestDto: Company.CreateCompanyRequestDto,
  ): Promise<CompanyEntity | Error> {
    try {
      const company = this.companyRepo.create(createCompanyRequestDto);
      this.logger.verbose(`company created: ${JSON.stringify(company)}`);
      return await this.companyRepo.save(company);
    } catch (error) {
      this.logger.error(`company created: ${error}`);
      return error;
    }
  }

  async findAllCompany(): Promise<CompanyEntity[]> {
    const company = await this.companyRepo.find();
    this.logger.verbose(`company Find All: ${JSON.stringify(company)}`);
    return company;
  }

  async findOneCompanyById({
    id,
  }: Company.FindOneCompanyByIdRequestDto): Promise<CompanyEntity | null> {
    const company = await this.companyRepo.findOne({ where: { id } });
    this.logger.verbose(`company Find One By ID: ${JSON.stringify(company)}`);
    return company;
  }

  async findOneCompanyByCode({
    code,
  }: Company.findOneCompanyByCodeRequestDto): Promise<CompanyEntity | null> {
    const company = await this.companyRepo.findOne({ where: { code } });
    this.logger.verbose(`company Find One By ID: ${JSON.stringify(company)}`);
    return company;
  }

  async updateCompany(
    update: Company.UpdateCompanyRequestDto,
  ): Promise<CompanyEntity | Error> {
    try {
      const company = await this.findOneCompanyById({ id: update.id });
      if (company) {
        this.logger.verbose(
          `Company Found to Update: ${JSON.stringify(company)}`,
        );
        const updateCompany = await this.companyRepo.merge(company, update);
        this.logger.verbose(
          `Updated Company: ${JSON.stringify(updateCompany)}`,
        );
        return await this.companyRepo.save(updateCompany);
      }
      throw new NotFoundException(`Company not found by id : ${update.id}`);
    } catch (error) {
      this.logger.error(`update: ${error.Message}`);
      return error;
    }
  }

  async removeCompany(
    id: Company.FindOneCompanyByIdRequestDto,
  ): Promise<CompanyEntity | Error> {
    const company = await this.findOneCompanyById(id);
    if (company) {
      return await this.companyRepo.remove(company);
    }
    return new NotFoundException(`company not found for id ${id}`);
  }
}
