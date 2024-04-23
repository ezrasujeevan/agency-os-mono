import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TCP } from 'src/constants';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(TCP.PROJECT_SERVICE) private projectClient: ClientProxy,
  ) {}
}
