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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@agency-os/class';
import { Request } from 'express';
import { Metadata } from '@grpc/grpc-js';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ description: 'User Created', type: User.User })
  @Post()
  create(@Body() createUserDto: User.CreateUserRequestDto) {
    return this.userService.create(createUserDto);
  }
  @ApiQuery({ name: 'email', required: false })
  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({ description: 'Got All Users' })
  @Get()
  async findAll(@Query('email') email?: string) {
    if (email) {
      return this.userService.findOneUserByEmail({ email });
    }
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({})
  findOneById(@Param('id') id: string) {
    return this.userService.findOneUserById({ id });
  }

  @Post('/bulk')
  async bulkCreate(@Body() createUserDto: User.CreateUserRequestDto[]) {
    const resp = [];
    for (const user of createUserDto) {
      resp.push(this.userService.create(user));
    }
    return resp;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRequestDto: User.UpdateUserRequestDto,
  ) {
    updateUserRequestDto.id = id;
    return this.userService.update(updateUserRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id });
  }
}
