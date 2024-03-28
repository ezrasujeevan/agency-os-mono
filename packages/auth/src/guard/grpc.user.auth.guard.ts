import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { AuthService } from '../auth.service';
import { User } from '@agency-os/common';
import { BaseRpcContext } from '@nestjs/microservices';

@Injectable()
export class GrpcUserAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) public readonly service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const request: BaseRpcContext = context.switchToRpc().getContext();
    const metadata: Metadata = request.getArgByIndex(1);

    if (!metadata) {
      throw new UnauthorizedException();
    }
    const authorization: string = metadata.get('Authorization')[0].toString();

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
