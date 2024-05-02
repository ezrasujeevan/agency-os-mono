import { User } from '@agency-os/class';
import { Inject, Injectable } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthUserService {
  constructor(@Inject(User.SERVICE_NAME) private userClient: ClientTCP) {}
  async loginUser(
    loginUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    return await firstValueFrom(
      this.userClient.send<User.UserResponseDto, User.LoginUserRequestDto>(
        User.Message.login,
        loginUserRequestDto,
      ),
    );
  }

  async registerUser(
    createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    return await firstValueFrom(
      this.userClient.send<User.UserResponseDto, User.CreateUserRequestDto>(
        User.Message.register,
        createUserRequestDto,
      ),
    );
  }

  async validateUser(
    validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    return await firstValueFrom(
      this.userClient.send<
        User.ValidateUserResponseDto,
        User.ValidateUserRequestDto
      >(User.Message.validate, validateUserRequestDto),
    );
  }

  async refreshTokenUser(
    refreshTokenUserRequestDto: User.RefreshTokenUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    return await firstValueFrom(
      this.userClient.send<
        User.LoginUserResponseDto,
        User.RefreshTokenUserRequestDto
      >(User.Message.refresh, refreshTokenUserRequestDto),
    );
  }
}
