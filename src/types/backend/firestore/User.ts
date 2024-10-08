import { Timestamp } from "firebase-admin/firestore";
import { Reservation } from "./Reservation";

export type User = {
    id: string;

    email: string;
    phone: string;

    firstName: string;
    lastName: string;

    birthDate?: string;

    reservations: Array<Reservation["id"]>;

    createdAt: Timestamp;
    updatedAt: Timestamp;

    profilePicture?: string;

    clv?: number; // increments when user adds reservation, decrements when reservation is cancelled
}