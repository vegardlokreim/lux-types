import { User } from "../firestore/User";
import { ResponseCode } from "../ResponseCodes";

export type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt"> & {
    password: string;
}

export type CreateUserResponse = {
    code: ResponseCode;
    message: string;
}