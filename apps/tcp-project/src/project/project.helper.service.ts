import { User, Client, Company } from '@agency-os/class';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectHelperService {
  constructor(
    @Inject(User.SERVICE_NAME) private readonly userService: ClientTCP,
    @Inject(Client.SERVICE_NAME) private readonly clientService: ClientTCP,
    @Inject(Company.SERVICE_NAME) private readonly companyService: ClientTCP,
  ) {}

  async isValidUser(id: string): Promise<boolean> {
    const userResponse = await firstValueFrom(
      await this.userService.send<
        User.UserResponseDto,
        User.FindOneUserByIdRequestDto
      >(User.Message.findOneById, { id }),
    );

    if (userResponse.status === HttpStatus.OK) return true;
  }

  async isValidClient(id: string): Promise<boolean> {
    const ClientResponse = await firstValueFrom(
      await this.clientService.send<
        Client.ClientResponseDto,
        Client.FindOneClientByIdRequestDto
      >(Client.Message.findOneById, { id }),
    );
    if (ClientResponse.status === HttpStatus.OK) return true;
  }

  async isValidCompany(id: string): Promise<boolean> {
    const companyResponse = await firstValueFrom(
      await this.companyService.send<
        Company.companyResponseDto,
        Company.FindOneCompanyByIdRequestDto
      >(Company.Message.findOneById, { id }),
    );
    if (companyResponse.status === HttpStatus.OK) return true;
  }
}
