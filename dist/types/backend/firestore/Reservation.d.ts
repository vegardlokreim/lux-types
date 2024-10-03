import { Timestamp } from "firebase-admin/firestore";
import { User } from "./User";
import { Vehicle } from "./Vehicle";
export type Reservation = {
    id: string;
    vehicle: Vehicle['id'];
    user: User['id'];
    from: Timestamp;
    to: Timestamp;
    subtotal: number;
    confirmed: boolean;
    isPaid: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
