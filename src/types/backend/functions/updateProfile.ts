import { Subset } from "../../comonTypes";
import { User } from "../firestore/User";

export type UpdateProfileParams = {
    id: User['id'],
    userInfo: Omit<Subset<User>, "id">
}

export type UpdateProfileResponse = {
    code: 200;
    message: string;
}
