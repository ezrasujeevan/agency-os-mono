import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@agency-os/proto';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './user.dto';

@Controller()
@User.UserServiceControllerMethods()
export class UserController {
  constructor(private readonly userService: UserService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  findAllUser() {
    return this.userService.findAll();
  }

  findOneUserbyId(findOneUserDto: FindOneUserDto) {
    return this.userService.findOne(findOneUserDto);
  }

  findOneUserByEmail(findOneUserDto: FindOneUserDto) {
    return this.userService.findOne(findOneUserDto);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.userService.remove(findOneUserDto);
  }
}
