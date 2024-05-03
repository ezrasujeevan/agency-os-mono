import { Company } from '@agency-os/class';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repositrory';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async findAllCompany(): Promise<Company.companyResponseDto> {
    const company = await this.companyRepo.findAllCompany();
    if (
      Array.isArray(company) &&
      company.every((c) => c instanceof CompanyEntity) &&
      company.length > 0
    ) {
      return {
        status: HttpStatus.OK,
        company,
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        error: 'Companies Not Found',
      };
    }
  }

  async findOneCompanyById(
    id: Company.FindOneCompanyByIdRequestDto,
  ): Promise<Company.companyResponseDto> {
    const company = await this.companyRepo.findOneCompanyById(id);
    if (company) {
      return {
        status: HttpStatus.OK,
        company,
      };
    }
    return {
      status: HttpStatus.NOT_FOUND,
      error: `No Company Found with Id ${JSON.stringify(id)}`,
    };
  }

  async findOneCompanyByCode(
    code: Company.findOneCompanyByCodeRequestDto,
  ): Promise<Company.companyResponseDto> {
    const company = await this.companyRepo.findOneCompanyByCode(code);
    if (company) {
      return {
        status: HttpStatus.OK,
        company,
      };
    }
    return {
      status: HttpStatus.NOT_FOUND,
      error: `No Company found with code ${JSON.stringify(code)}`,
    };
  }

  async createCompany(
    create: Company.CreateCompanyRequestDto,
  ): Promise<Company.companyResponseDto> {
    const companyCode = await this.companyRepo.findOneCompanyByCode({
      code: create.code,
    });
    if (companyCode) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Company Code Already Exits',
      };
    }
    const company = await this.companyRepo.createCompany(create);
    if (company instanceof CompanyEntity) {
      return {
        status: HttpStatus.CREATED,
        company,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: company.message,
    };
  }

  async updateCompany(
    update: Company.UpdateCompanyRequestDto,
  ): Promise<Company.companyResponseDto> {
    const { code } = update;
    if (code) {
      const companyCode = await this.findOneCompanyByCode({ code });
      if (companyCode) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'Company Code already exist ',
        };
      }
    }
    const company = await this.companyRepo.updateCompany(update);
    if (company instanceof CompanyEntity) {
      return {
        status: HttpStatus.OK,
        company,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: company.message,
    };
  }

  async removeCompany(id: Company.FindOneCompanyByIdRequestDto) {
    const company = await this.companyRepo.removeCompany(id);
    if (company instanceof CompanyEntity) {
      return {
        status: HttpStatus.NO_CONTENT,
      };
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      error: company.message,
    };
  }
}
