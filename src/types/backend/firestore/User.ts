import { Timestamp } from "firebase-admin/firestore";
import { Reservation } from "./Reservation";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate?: string;
    reservations: Array<Reservation['id']>;
    reservationDocs: Array<Reservation>;
    createdAt: Timestamp;
    updatedAt: Timestamp;

    profilePicture?: string;
}