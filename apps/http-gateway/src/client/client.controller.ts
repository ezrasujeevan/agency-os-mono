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
import { ClientService } from './client.service';
import { Client } from '@agency-os/class';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() create: Client.CreateClientRequestDto) {
    return this.clientService.createClient(create);
  }

  @Post('/bulk')
  createBulk(@Body() create: Client.CreateClientRequestDto[]) {
    return this.clientService.createBulk(create);
  }

  @ApiQuery({ name: 'company', required: false })
  @ApiQuery({ name: 'email', required: false })
  @Get()
  findAll(
    @Query('company') companyId?: string,
    @Query('email') email?: string,
  ) {
    if (email) {
      return this.clientService.findOneClientByEmail({ email });
    }
    if (companyId) {
      return this.clientService.findAllClientByCompany({ companyId });
    }
    return this.clientService.findAllClient();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOneClientById({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Client.UpdateClientRequestDto,
  ) {
    update.id = id;
    return this.clientService.updateClient(update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.removeClient({ id });
  }
}
