import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { User } from '@agency-os/common';
import { UserService } from './user.service';
import { BaseRpcContext } from '@nestjs/microservices';
import { RpcArgumentsHost } from '@nestjs/common/interfaces';
import { request } from 'express';

@Injectable()
export class GrpcUserAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    // const rpcArgumentsHost: RpcArgumentsHost = context.switchToRpc();
    // const rpcContext = rpcArgumentsHost.getContext<ExecutionContext>();
    const metadata: Metadata = context.getArgByIndex(1);
    // const baseRpcContext = rpcContext.getArgByIndex(1);

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
      await this.userService.validate({ token });
    if (error.length !== 0 || status !== HttpStatus.OK) {
      throw new UnauthorizedException(error);
    }

    return true;
  }
}
