import { ResponseCode } from "../ResponseCodes";

export type SetPaymentStatusParams = {
    reservationId: string;
    isPaid: boolean;
}

export type SetPaymentStatusResponse = {
    code: ResponseCode;
    message: string;
}