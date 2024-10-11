import { Timestamp } from "firebase-admin/firestore";
import { vehicleClasses } from "../../../consts/vehicleClasses";
import { User } from "./User";

export type VehicleClasses = typeof vehicleClasses[number]

export type DriversLicense = {
    id: string;
    url: string;
    lastName: string;
    firstName: string;
    birthDate: Date;
    issued: Date;
    expires: Date;
    issuedBy: string;
    pid: string;
    licenseNumber: string;
    classes: VehicleClasses[];

    userId: User["id"]

    createdAt: Timestamp;
    updatedAt: Timestamp;

    isConfirmed: boolean;
    lastConfirmed: Timestamp;
}

