import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '@agency-os/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('client')
@ApiTags('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientRequestDto: Client.CreateClientRequestDto) {
    return this.clientService.create(createClientRequestDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientRequestDto: Client.UpdateClientRequestDto,
  ) {
    return this.clientService.update(id, updateClientRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove({ id });
  }
}
