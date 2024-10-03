import { Reservation } from "../firestore/Reservation"
import { User } from "../firestore/User"
import { Vehicle } from "../firestore/Vehicle"
import { ResponseCode } from "../ResponseCodes"

export type GetReservationsParams = {
    id: User['id']
}

export type GetReservationsResponse = {
    code: ResponseCode;
    reservations: Array<{ reservation: Reservation; vehicle?: Vehicle }>
}