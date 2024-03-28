import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Metadata } from '@grpc/grpc-js';
import { User } from '@agency-os/common';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    let request, authorization;

    if (context.getType() === 'rpc') {
      request = context.switchToRpc().getContext();
      const metadata: Metadata = request.getArgByIndex(1);

      if (!metadata) {
        throw new UnauthorizedException();
      }
      authorization = metadata.get('Authorization')[0].toString();
    } else if (context.getType() == 'http') {
      request = context.switchToHttp().getRequest();
      authorization = request.headers['authorization'];
    }

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
