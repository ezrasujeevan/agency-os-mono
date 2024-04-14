import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@agency-os/common';
import { UserAuthGuard } from '@agency-os/auth';
import { Request } from 'express';
import { Metadata } from '@grpc/grpc-js';

@ApiTags('user')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ description: 'User Created', type: User.User })
  @Post()
  create(@Body() createUserDto: User.CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({ description: 'Got All Users' })
  @Get()
  async findAll(@Req() request: Request): Promise<User.User[]> {
    const token = this.getTokenFromRequest(request)!;
    const metadata: Metadata = new Metadata();
    metadata.set('Authorization', token);
    const users = await this.usersService.findAll({}, metadata);
    return users.users;
  }

  @Get(':id')
  @ApiOperation({})
  findOneById(@Param('id') id: string) {
    return this.usersService.findOnebyUserId(id);
  }
  @Get(':email')
  @ApiOperation({})
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOnebyUserEmail(email);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: User.UpdateUserRequestDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  private getTokenFromRequest(request: Request) {
    return request.headers.authorization;
  }
}
