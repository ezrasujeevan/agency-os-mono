import { UserProto, ClientProto } from '@agency-os/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectHelperService implements OnModuleInit {
  private userService: UserProto.UserServiceClient;
  private clientService: ClientProto.ClientServiceClient;
  private companyService: ClientProto.CompanyServiceClient;
  constructor(
    @Inject(ClientProto.CLIENT_PACKAGE_NAME) private clientGrpc: ClientGrpc,
    @Inject(UserProto.USER_PACKAGE_NAME) private userGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.userGrpc.getService<UserProto.UserServiceClient>(
      UserProto.USER_SERVICE_NAME,
    );
    this.clientService =
      this.clientGrpc.getService<ClientProto.ClientServiceClient>(
        ClientProto.CLIENT_SERVICE_NAME,
      );
    this.companyService =
      this.clientGrpc.getService<ClientProto.CompanyServiceClient>(
        ClientProto.COMPANY_SERVICE_NAME,
      );
  }

  async isValidUser(userId: string): Promise<boolean> {
    const user = await firstValueFrom(
      await this.userService.findOneUserbyId({
        id: userId,
      }),
    );
    return !!user;
  }

  async isValidClient(clientId: string): Promise<boolean> {
    const client = await firstValueFrom(
      await this.clientService.findOneClientbyId({
        id: clientId,
      }),
    );
    return !!client;
  }

  async isValidCompany(companyId: string): Promise<boolean> {
    const company = await firstValueFrom(
      await this.companyService.findOneCompany({
        id: companyId,
      }),
    );
    return !!company;
  }
}
