import { Reservation } from "../firestore/Reservation";
import { ResponseCode } from "../ResponseCodes";

export type CreateReservationParams = Omit<Reservation, "id" | "createdAt" | "updatedAt" | "vehicleDoc" | "userDoc">

export type CreateReservationResponse = {
    code: ResponseCode;
    id: Reservation['id']
    message: string;
}
