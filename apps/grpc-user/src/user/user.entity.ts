import { UserClass } from '@agency-os/common';
import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('user')
export class UserEntity implements UserClass {}
ya