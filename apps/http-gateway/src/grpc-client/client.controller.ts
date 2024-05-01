import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '@agency-os/class';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ClientAuthGuard } from '@agency-os/auth';

@ApiTags('client')
@ApiBearerAuth()
@UseGuards(ClientAuthGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Client Created', type: Client.Client })
  create(@Body() createClientRequestDto: Client.CreateClientRequestDto) {
    return this.clientService.create(createClientRequestDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll({});
  }

  @ApiQuery({
    name: 'id',
    type: String,
    description: 'Find User By Id',
    required: false,
  })
  @ApiQuery({
    name: 'email',
    type: String,
    description: 'Find User By Id',
    required: false,
  })
  @Get('find')
  findOne(@Query('id') id?: string, @Query('email') email?: string) {
    if (email && email !== undefined) {
      return this.clientService.findOneByEmail({ email });
    } else if (id && id !== undefined) {
      return this.clientService.findOneById({ id });
    }
    throw new BadRequestException('need at least one query of email or id');
  }
}
