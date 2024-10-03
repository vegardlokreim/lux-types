import { VehicleType } from "./VehicleTypes";
import { Reservation } from "./Reservation";
import { Timestamp } from "firebase-admin/firestore";
export type Vehicle = {
    id: string;
    type: VehicleType;
    transmission: "A" | "M";
    seats: number;
    interiorColour: string;
    category: string;
    bodyType: string;
    brand: string;
    model: string;
    year: number;
    regId: string;
    thumbnail: string;
    tariffs: {
        PR_DAY: number;
        PR_HOUR: number;
        PR_WEEK: number;
        PR_MONTH: number;
    };
    displayTariff: "PR_DAY" | "PR_HOUR" | "PR_WEEK" | "PR_MONTH";
    deliverAt: {
        address: string;
        city: string;
        country: string;
        zip: string;
    };
    pickupAt: {
        address: string;
        city: string;
        country: string;
        zip: string;
    };
    exteriorColor: string;
    hp: number;
    reservations: Array<Reservation['id']>;
    reservationDocs: Array<Reservation>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
