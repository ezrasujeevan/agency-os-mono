import { CommonEntity } from '@agency-os/common';
import { User } from '@agency-os/proto';
import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('user')
export class UserEntity extends CommonEntity implements User.User {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
