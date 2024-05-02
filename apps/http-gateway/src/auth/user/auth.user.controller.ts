import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './auth.user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@agency-os/class';

@ApiTags('auth/user', 'auth', 'user', 'tcp/auth', 'tcp/auth/user')
@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('login')
  async login(
    @Body() loginUserRequestDto: User.LoginUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    return await this.authUserService.loginUser(loginUserRequestDto);
  }

  @Post('register')
  async register(
    @Body() createUserRequestDto: User.CreateUserRequestDto,
  ): Promise<User.UserResponseDto> {
    return await this.authUserService.registerUser(createUserRequestDto);
  }

  @Post('validate')
  async validate(
    @Body() validateUserRequestDto: User.ValidateUserRequestDto,
  ): Promise<User.ValidateUserResponseDto> {
    return await this.authUserService.validateUser(validateUserRequestDto);
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenUserRequestDto: User.RefreshTokenUserRequestDto,
  ): Promise<User.LoginUserResponseDto> {
    return await this.authUserService.refreshTokenUser(
      refreshTokenUserRequestDto,
    );
  }
}
