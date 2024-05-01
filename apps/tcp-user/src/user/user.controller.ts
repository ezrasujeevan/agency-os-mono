import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@agency-os/class';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(User.Message.create)
  async createUser(
    @Payload() createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.userService.create(createUserRequestDto);
  }

  @MessagePattern(User.Message.findAll)
  async findAllUser(): Promise<User.UserResponseDto> {
    return await this.userService.findAll({});
  }

  @MessagePattern(User.Message.findOneById)
  async findOneUserById(
    @Payload() findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.userService.findOneById(findOneUserByIdRequestDto);
  }

  @MessagePattern(User.Message.findOneByEmail)
  async findOneUserByEmail(
    @Payload() findOneUserByEmailRequestDto: User.FindOneUserByEmailRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.userService.findOneByEmail(findOneUserByEmailRequestDto);
  }

  @MessagePattern(User.Message.create)
  async updateUser(
    @Payload() updateUserRequestDto: User.UpdateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.userService.update(updateUserRequestDto);
  }

  @MessagePattern(User.Message.delete)
  async removeUser(
    @Payload() findOneUserByIdRequestDto: User.FindOneUserByIdRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.userService.remove(findOneUserByIdRequestDto);
  }

  @MessagePattern(User.Message.register)
  async registerUser(
    @Payload() createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.userService.register(createUserRequestDto);
  }

  @MessagePattern(User.Message.login)
  async loginUser(
    @Payload() loginUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    return await this.userService.login(loginUserRequestDto);
  }

  @MessagePattern(User.Message.validate)
  async validateUser(
    @Payload() validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    return await this.userService.validate(validateUserRequestDto);
  }

  @MessagePattern(User.Message.refresh)
  async refreshTokenUser(
    @Payload() refreshTokenUserRequestDto: User.RefreshTokenUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    return await this.userService.refreshToken(refreshTokenUserRequestDto);
  }
}
