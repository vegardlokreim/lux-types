import { Timestamp } from "firebase-admin/firestore";
import { User } from "./User";

export type DriversLicenseLight = {
    id: string;

    issued: Date;
    expires: Date;
    pid: string;
    licenseNumber: string;

    userId: User["id"]

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

