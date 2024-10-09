import { Timestamp } from "firebase-admin/firestore";
import { Vehicle } from "./Vehicle";
import { User } from "./User";

export type Damage = {
    id: string;
    vehicleId: Vehicle["id"];
    userId?: User["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    fixedAt?: Timestamp;
    fixed: boolean;
    description: string;
    locationOnCar: string;
    locationCode: string; // TODO: maybe make this typesafe at some point?
    images: string[];
    registeredBy: User["id"];
    vehicleRegId: Vehicle["regId"];
}