import { Timestamp } from "firebase-admin/firestore";
import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { Contract } from "./Contract";
import { CarPickupAgreement } from "./CarPickupAgreement";
import { CarDeliverAgreement } from "./CarDeliverAgreement";

export type Reservation = {
    id: string;

    user: User["id"];
    vehicle: Vehicle["id"];

    userDoc: User;
    vehicleDoc: Vehicle;

    isPaid: boolean;


    subtotal: number;
    securityAmount: number;

    confirmed: boolean;


    to: Timestamp;
    from: Timestamp;

    duration: {
        days: number;
        hours: number;
    }

    createdAt: Timestamp;
    updatedAt: Timestamp;

    contract: Contract["id"];

    carPickupAgreement?: CarPickupAgreement["id"];
    carDeliverAgreement?: CarDeliverAgreement["id"];

    includedKm: number;
    additionalKm: number;

    contractUrl?: string;
}