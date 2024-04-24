import { AuthService } from '@agency-os/auth';
import { User } from '@agency-os/class';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth', 'user', 'auth/user')
@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserRequestDto: User.LoginUserRequestDto) {
    return await this.authService.loginUser(loginUserRequestDto);
  }
  @Post('register')
  async register(@Body() createUserRequestDto: User.CreateUserRequestDto) {
    return await this.authService.registerUser(createUserRequestDto);
  }
  @Post('validate')
  async validate(@Body() validateUserRequestDto: User.ValidateUserRequestDto) {
    return await this.authService.validateUser(validateUserRequestDto);
  }
  @Post('refresh')
  async refresh(
    @Body() refreshTokenUserRequestDto: User.RefreshTokenUserRequestDto,
  ) {
    return await this.authService.refeshTokenUser(refreshTokenUserRequestDto);
  }
}
