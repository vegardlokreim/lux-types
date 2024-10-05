import { Timestamp } from 'firebase-admin/firestore';

type Subset<T> = {
    [A in keyof T]?: T[A] extends object ? Subset<T[A]> : T[A] extends object | null ? Subset<T[A]> | null : T[A] extends object | null | undefined ? Subset<T[A]> | null | undefined : T[A];
};

declare const successCodes: readonly [201, 200];
declare const errorCodes: readonly [404];
declare const internalErrorCodes: readonly [500];

type ResponseCode = typeof successCodes[number] | typeof errorCodes[number] | typeof internalErrorCodes[number];

declare const vehicleTypes: readonly ["car", "bike", "bus"];
type VehicleType = typeof vehicleTypes[number];

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate?: string;
    reservations: Array<Reservation['id']>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

type Reservation = {
    id: string;
    vehicle: Vehicle['id'];
    user: User['id'];
    vehicleDoc: Vehicle;
    userDoc: User;
    from: Timestamp;
    to: Timestamp;
    subtotal: number;
    confirmed: boolean;
    isPaid: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

type Vehicle = {
    id: string;
    type: VehicleType;
    transmission: "A" | "M";
    seats: number;
    doors: string;
    tankVolume?: number;
    interiorColor: string;
    category: string;
    bodyType: string;
    brand: string;
    model: string;
    year: number;
    regId: string;
    thumbnail: string;
    prDay: number;
    prHour: number;
    prWeek: number;
    prMonth: number;
    displayTariff: "PR_DAY" | "PR_HOUR" | "PR_WEEK" | "PR_MONTH";
    deliverAt: string;
    pickupAt: string;
    exteriorColor: string;
    hp: number;
    reservations: Array<Reservation['id']>;
    reservationDocs: Array<Reservation>;
    fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
    wd: "front" | "back" | "4WD" | "AWD";
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

type CreateVehicleParams = Omit<Vehicle, "id" | "createdAt" | "updatedAt">;
type CreateVehicleResponse = {
    code: ResponseCode;
    id: Vehicle['id'];
    message: string;
};

type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt"> & {
    password: string;
};
type CreateUserResponse = {
    code: ResponseCode;
    message: string;
};

type CreateReservationParams = Omit<Reservation, "id" | "createdAt" | "updatedAt" | "vehicleDoc" | "userDoc">;
type CreateReservationResponse = {
    code: ResponseCode;
    id: Reservation['id'];
    message: string;
};

type GetReservationsParams = {
    id: User['id'];
};
type GetReservationsResponse = {
    code: ResponseCode;
    reservations: Array<{
        reservation: Reservation;
        vehicle?: Vehicle;
    }>;
};

declare function timestampToDate(timestamp: Timestamp): Date;

declare function callFunction<P, R>(name: string, params?: P): Promise<R>;

declare const vehicleList: readonly ["type", "someType"];

declare const someConst: string[];

export { type CreateReservationParams, type CreateReservationResponse, type CreateUserParams, type CreateUserResponse, type CreateVehicleParams, type CreateVehicleResponse, type GetReservationsParams, type GetReservationsResponse, type Reservation, type ResponseCode, type Subset, type User, type Vehicle, type VehicleType, callFunction, errorCodes, internalErrorCodes, someConst, successCodes, timestampToDate, vehicleList, vehicleTypes };
