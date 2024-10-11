import { Timestamp } from 'firebase-admin/firestore';
import { WhereFilterOp, Firestore, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import React$1 from 'react';

declare const successCodes: readonly [201, 200];
declare const errorCodes: readonly [404];
declare const internalErrorCodes: readonly [500];
declare const firestoreCollections: readonly ["users", "userPermissions", "vehicles", "reservations", "driversLicenses", "damages"];

type Subset<T> = {
    [A in keyof T]?: T[A] extends object ? Subset<T[A]> : T[A] extends object | null ? Subset<T[A]> | null : T[A] extends object | null | undefined ? Subset<T[A]> | null | undefined : T[A];
};
type FirestoreCollection = typeof firestoreCollections[number];

type ResponseCode = typeof successCodes[number] | typeof errorCodes[number] | typeof internalErrorCodes[number];

declare const vehicleTypes: readonly ["car", "bike", "bus"];
type VehicleType = typeof vehicleTypes[number];

type User = {
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
    clv?: number;
};

type Damage = {
    id: string;
    userId?: User["id"];
    vehicleId: Vehicle["id"];
    fixed: boolean;
    images: string[];
    description: string;
    locationCode: string;
    locationOnCar: string;
    registeredBy: User["id"];
    vehicleRegId: Vehicle["regId"];
    fixedAt?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

type Contract = {
    id: string;
    vehicleId: Vehicle["id"];
    userId: User["id"];
    signedAt: Timestamp;
    damages: Damage[];
    from: Timestamp;
    to: Timestamp;
    pickupAt: string;
    deliverAt: string;
    duration: {
        days: number;
        hours: number;
    };
    price: number;
    insuranceType: string;
    insuranceCost: number;
    securityAmount: number;
    subtotal: number;
    signatureUrl: string;
    reservation?: Reservation["id"];
};

type Reservation = {
    id: string;
    user: User["id"];
    vehicle: Vehicle["id"];
    userDoc: User;
    vehicleDoc: Vehicle;
    isPaid: boolean;
    subtotal: number;
    securityAmount: number;
    confirmed: boolean;
    to: Timestamp;
    from: Timestamp;
    duration: {
        days: number;
        hours: number;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
    contract?: Contract["id"];
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
    reservations: Array<Reservation["id"]>;
    fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
    wd: "front" | "back" | "4WD" | "AWD";
    createdAt: Timestamp;
    updatedAt: Timestamp;
    damages: Array<Damage["id"]>;
};

type UpdateVehicleParams = {
    id: Vehicle['id'];
    vehicleData: Omit<Subset<Vehicle>, "id" | "createdAt" | "updatedAt">;
};
type UpdateVehicleResponse = {
    code: ResponseCode;
    message: string;
};

type UpdateProfileParams = {
    id: User['id'];
    userInfo: Omit<Subset<User>, "id">;
};
type UpdateProfileResponse = {
    code: 200;
    message: string;
};

type GetVehicleInfoParams = {
    regId: Vehicle["regId"];
};
type GetVehicleInfoResponse = {
    code: 200;
    vehicleInfo: any;
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

type CreateReservationParams = Omit<Reservation, "id" | "createdAt" | "updatedAt">;
type CreateReservationResponse = {
    code: ResponseCode;
    id: Reservation["id"];
    message: string;
};

type CreateDamageParams = Omit<Damage, "id" | "createdAt" | "updatedAt" | "fixed" | "registeredBy">;
type CreateDamageResponse = {
    code: 201;
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

declare const vehicleClasses: readonly ["A1", "A", "B", "C1", "C", "D1", "D", "BE", "C1E", "CE", "D1E", "DE", "M", "S", "T"];

type VehicleClasses = typeof vehicleClasses[number];
type DriversLicense = {
    id: string;
    url: string;
    lastName: string;
    firstName: string;
    birthDate: Date;
    issued: Date;
    expires: Date;
    issuedBy: string;
    pid: string;
    licenseNumber: string;
    classes: VehicleClasses[];
    userId: User["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    isConfirmed: boolean;
    lastConfirmed: Timestamp;
};

type WhereFilterOpType<T> = T extends Array<infer _U> ? "array-contains" | "array-contains-any" | WhereFilterOp : WhereFilterOp;
type WhereClause<T> = {
    [K in keyof T]: [K, WhereFilterOpType<T[K]>, T[K] extends Array<infer U> ? U : T[K]];
}[keyof T];
type ReturnType<DocumentType> = Promise<{
    ref: QueryDocumentSnapshot<DocumentData, DocumentData>;
    data: DocumentType;
}[]>;
declare function getDocsWhere<DocumentType>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<DocumentType>[], dontThrow?: boolean): ReturnType<DocumentType>;

declare function timestampToDate(timestamp: Timestamp | undefined | null, throwError?: boolean): Date;

declare function formatDate(date: Date, locale: Intl.LocalesArgument, compress?: boolean): string;

declare function callFunction<P, R>(name: string, params?: P): Promise<R>;

declare function useScrollToTop(): void;

declare function useFetchDocsWhere<T>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<T>[], setData: React$1.Dispatch<React$1.SetStateAction<T[] | undefined>>, dependencies?: any[], setError?: React$1.Dispatch<React$1.SetStateAction<string | undefined>>): void;

declare function useFetchDocs<T>(db: Firestore, collectionName: FirestoreCollection, setData: React$1.Dispatch<React$1.SetStateAction<T[]>> | React$1.Dispatch<React$1.SetStateAction<T[] | undefined>>, setError: React$1.Dispatch<React$1.SetStateAction<string | undefined>>): void;

declare function useFetchDoc<T>(db: Firestore, collectionName: FirestoreCollection, docId: string | undefined, setData: React.Dispatch<React.SetStateAction<T | undefined>>, setError?: React.Dispatch<React.SetStateAction<string | undefined>>): void;

declare const vehicleList: readonly ["type", "someType"];

export { type Contract, type CreateDamageParams, type CreateDamageResponse, type CreateReservationParams, type CreateReservationResponse, type CreateUserParams, type CreateUserResponse, type CreateVehicleParams, type CreateVehicleResponse, type Damage, type DriversLicense, type FirestoreCollection, type GetReservationsParams, type GetReservationsResponse, type GetVehicleInfoParams, type GetVehicleInfoResponse, type Reservation, type ResponseCode, type Subset, type UpdateProfileParams, type UpdateProfileResponse, type UpdateVehicleParams, type UpdateVehicleResponse, type User, type Vehicle, type VehicleClasses, type VehicleType, type WhereClause, type WhereFilterOpType, callFunction, errorCodes, firestoreCollections, formatDate, getDocsWhere, internalErrorCodes, successCodes, timestampToDate, useFetchDoc, useFetchDocs, useFetchDocsWhere, useScrollToTop, vehicleClasses, vehicleList, vehicleTypes };
