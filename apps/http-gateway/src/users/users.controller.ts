import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, User, UpdateUserDto, Users } from '@agency-os/common';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ description: 'User Created', type: User })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('asdasd');
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({ description: 'Got All Users', type: Users })
  @Get()
  findAll() {
    return this.usersService.findAll();
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
