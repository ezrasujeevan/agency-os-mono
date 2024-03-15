import { User } from '@agency-os/proto';
export declare class UserEnity implements User.User {
    id: string;
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}
