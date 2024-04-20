import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { User } from '@agency-os/class';

@Injectable()
export class HttpUserAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const request: Request = context.switchToHttp().getRequest();
    const authorization: string = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const { status, userId, error }: User.ValidateUserResponseDto =
      await this.service.validateUser({ token });
    if (error || status !== HttpStatus.OK) {
      throw new UnauthorizedException(error);
    }
    request['user'] = userId;

    return true;
  }
}
