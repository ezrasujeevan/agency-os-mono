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
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserGrpc as User } from '@agency-os/class';
import { ClientAuthGuard, UserAuthGuard } from '@agency-os/auth';
import { Request } from 'express';
import { Metadata } from '@grpc/grpc-js';

@ApiTags('user', 'grpc')
@Controller('grpc/user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ description: 'User Created', type: User.User })
  @Post()
  create(@Body() createUserDto: User.CreateUserRequestDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({ description: 'Got All Users' })
  @Get()
  async findAll(@Req() request: Request) {
    const token = this.getTokenFromRequest(request)!;
    const metadata: Metadata = new Metadata();
    metadata.set('Authorization', token);
    const users = (await this.userService.findAll({}, metadata)).users;
    return users;
  }

  @Get(':id')
  @ApiOperation({})
  findOneById(@Param('id') id: string) {
    return this.userService.findOnebyUserId(id);
  }
  @Get(':email')
  @ApiOperation({})
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOnebyUserEmail(email);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: User.UpdateUserRequestDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  private getTokenFromRequest(request: Request) {
    return request.headers.authorization;
  }
}
