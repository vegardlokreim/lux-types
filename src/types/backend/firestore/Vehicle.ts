import { VehicleType } from "./VehicleTypes";
import { Reservation } from "./Reservation";
import { Timestamp } from "firebase-admin/firestore";

export type Vehicle = {
    id: string;
    type: VehicleType;
    transmission: "A" | "M";
    seats: number;
    doors: string;
    tankVolume?: number;
    interiorColor: string;
    category: string; // e.g premium
    bodyType: string;  // e.g sport / suv / pick up
    brand: string; // eg. audi
    model: string;
    year: number;
    regId: string;
    thumbnail: string; // main image

    prDay: number;
    prHour: number;
    prWeek: number;
    prMonth: number;

    displayTariff: "PR_DAY" | "PR_HOUR" | "PR_WEEK" | "PR_MONTH";

    deliverAt: string;

    pickupAt: string;

    exteriorColor: string;

    hp: number

    reservations: Array<Reservation['id']>

    reservationDocs: Array<Reservation> // because of this, we need to have a triggered function that updates this field whenever a reservation is changed

    fuelType: "gasoline" | "diesel" | "hybrid" | "electric"

    wd: "front" | "back" | "4WD" | "AWD"

    createdAt: Timestamp;
    updatedAt: Timestamp;


}
