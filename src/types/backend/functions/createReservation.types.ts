import { Reservation } from "../firestore/Reservation";
import { ResponseCode } from "../ResponseCodes";
import { Contract } from "../firestore/Contract";

export type CreateReservationParams = {
    reservation: Omit<Reservation, "id" | "createdAt" | "updatedAt" | "contract">;
    contract: Omit<Contract, "id">;
}

export type CreateReservationResponse = {
    code: ResponseCode;
    id: Reservation["id"]
    message: string;
}
