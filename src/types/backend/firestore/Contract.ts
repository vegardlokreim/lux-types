import { Vehicle } from "./Vehicle";
import { User } from "./User";
import { Timestamp } from "firebase-admin/firestore";
import { Damage } from "./Damage";
import { Reservation } from "./Reservation";

export type Contract = {
    id: string;

    vehicleId: Vehicle["id"];
    userId: User["id"];

    signedAt: Timestamp;

    damages: Damage[];

    from: Timestamp;
    to: Timestamp;

    pickupAt: string;
    deliverAt: string;

    duration: {
        days: number;
        hours: number;
    };

    price: number;

    insuranceType: string; // TODO: Type this!
    insuranceCost: number;

    securityAmount: number;

    subtotal: number;

    signatureUrl: string;

    reservation?: Reservation["id"];

}