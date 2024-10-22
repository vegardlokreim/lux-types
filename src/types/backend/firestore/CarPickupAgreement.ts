import { Timestamp } from "firebase-admin/firestore";

import { User } from "./User";
import { Damage } from "./Damage";
import { Vehicle } from "./Vehicle";
import { Reservation } from "./Reservation";

export type CarPickupAgreement = {
    id: string;

    vehicleId: Vehicle["id"];
    userId: User["id"];

    signedAt: Timestamp;

    damages: Damage[];

    reservation: Reservation["id"];

    signatureUrl: string;

    url?: string; //url to the signed agreement

    odometer: number;
    fuelLevel?: number;

    images: string[];
}