import { User } from '@agency-os/proto';
export declare class CreateUserDto implements User.CreateUserDto {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}
export declare class FindOneUserDto implements User.FindOneUserDto {
    id?: string;
    email?: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base implements User.UpdateUserDto {
    id: string;
}
export {};
