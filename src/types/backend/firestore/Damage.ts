import { Timestamp } from "firebase-admin/firestore";
import { Vehicle } from "./Vehicle";
import { User } from "./User";

export type Damage = {
    id: string;

    userId?: User["id"];
    vehicleId: Vehicle["id"];

    fixed: boolean;

    images: string[];

    description: string;
    locationCode: string; // TODO: maybe make this typesafe at some point?
    locationOnCar: string;


    registeredBy: User["id"];
    vehicleRegId: Vehicle["regId"];

    fixedAt?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}