import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { Client } from '@agency-os/class';

@Injectable()
export class HttpClientAuthGuard implements CanActivate {
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

    const { status, clientId, error }: Client.ValidateClientResponseDto =
      await this.service.validateClient({ token });
    if (error || status !== HttpStatus.OK) {
      throw new UnauthorizedException(error);
    }
    request['client'] = clientId;

    return true;
  }
}
