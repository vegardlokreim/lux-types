import { Timestamp } from 'firebase-admin/firestore';
import { WhereFilterOp, Firestore, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import React$1 from 'react';

declare const successCodes: readonly [201, 200];
declare const errorCodes: readonly [404];
declare const internalErrorCodes: readonly [500];
declare const firestoreCollections: readonly ["users", "userPermissions", "vehicles", "reservations", "driversLicenses", "damages", "contracts", "carDeliveryAgreements", "carPickupAgreements"];
declare const userStoragePath: readonly ["profilePicture", "driversLicense", "signatures", "contracts", "carPickupAgreements", "carDeliveryAgreements"];
declare const CREDIT_GRADE: readonly ["A", "B", "C", "D", "E", "IR", "KS"];

type Subset<T> = {
    [A in keyof T]?: T[A] extends object ? Subset<T[A]> : T[A] extends object | null ? Subset<T[A]> | null : T[A] extends object | null | undefined ? Subset<T[A]> | null | undefined : T[A];
};
type FirestoreCollection = (typeof firestoreCollections)[number];
type UserStoragePath = (typeof userStoragePath)[number];
type Location = {
    address: string;
    lat: number;
    lng: number;
};

type ResponseCode = typeof successCodes[number] | typeof errorCodes[number] | typeof internalErrorCodes[number];

type CreditCheckResponse = {
    /**
     * Score from 0 - 100, where 100 is the best score
     */
    score: number;
    /**
     * Credit grade, where A is the best grade
     */
    scoreKarakter: (typeof CREDIT_GRADE)[number];
    /**
     * Explanation of the credit grade, norewegian text
     */
    scoreForklaring: string;
    /**
     * Suggested credit limit in norwegian kr
     */
    kredittgrense: number;
};

type CarDeliverAgreement = {
    id: string;
    vehicleId: Vehicle["id"];
    userId: User["id"];
    signedAt: Timestamp;
    damages: Damage[];
    reservation: Reservation["id"];
    signatureUrl: string;
    url?: string;
    odometer: number;
    fuelLevel?: number;
    images: string[];
};

type CarPickupAgreement = {
    id: string;
    vehicleId: Vehicle["id"];
    userId: User["id"];
    signedAt: Timestamp;
    damages: Damage[];
    reservation: Reservation["id"];
    signatureUrl: string;
    url?: string;
    odometer: number;
    fuelLevel?: number;
    images: string[];
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
    contractUrl?: string;
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
    agreedPickupLocation: Location;
    agreedDeliverLocation: Location;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    createdBy?: User["id"];
    contract?: Contract["id"];
    carPickupAgreement?: CarPickupAgreement["id"];
    carDeliverAgreement?: CarDeliverAgreement["id"];
    includedKm: number;
    additionalKm: number;
    contractUrl?: string;
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
    address: {
        street: string;
        city: string;
        zip: string;
        country: string;
    };
    driversLicense?: DriversLicense["id"];
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

declare const vehicleTypes: readonly ["car", "bike", "bus"];
type VehicleType = typeof vehicleTypes[number];

type Vehicle = {
    id: string;
    type: VehicleType;
    transmission: "A" | "M";
    seats: number;
    doors: string;
    tankVolume?: number;
    interiorColor: string;
    exteriorColor: string;
    category: string;
    bodyType: string;
    brand: string;
    model: string;
    year: number;
    regId: string;
    thumbnail: string;
    vin: string;
    fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
    wd: "front" | "back" | "4WD" | "AWD";
    hp: number;
    engineVolume: number;
    volumeTank: number;
    fuelConsumption: number;
    l: number;
    w: number;
    h: number;
    weight: number;
    prDay: number;
    prHour: number;
    prWeek: number;
    prMonth: number;
    cylinderCount: number;
    cylinderArrangement: string | null;
    displayTariff: "PR_DAY" | "PR_HOUR" | "PR_WEEK" | "PR_MONTH";
    securityDeposit: number;
    deliverAt: Location;
    pickupAt: Location;
    reservations: Array<Reservation["id"]>;
    unavailableDates?: Array<{
        from: Timestamp;
        to: Timestamp;
        reservationId: Reservation["id"];
    }>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    damages: Array<Damage["id"]>;
    images?: Array<string>;
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

type SetPaymentStatusParams = {
    reservationId: string;
    isPaid: boolean;
};
type SetPaymentStatusResponse = {
    code: ResponseCode;
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

type CreateReservationParams = {
    reservation: Omit<Reservation, "id" | "createdAt" | "updatedAt" | "contract"> | Omit<Reservation, "createdAt" | "updatedAt" | "contract">;
    contract?: Omit<Contract, "id">;
};
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

interface InsurancePlan {
    id: string;
    name: string;
    description: string;
    coverage: {
        liability: number;
        collision: boolean;
        theft: boolean;
        personalEffects: boolean;
    };
    dailyRate: number;
}
interface LocationService {
    id: string;
    type: "PICKUP" | "DELIVERY";
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    basePrice: number;
    pricePerKm: number;
}
interface RentalExtras {
    insurancePlanId?: string;
    customPickup?: LocationService;
    customDelivery?: LocationService;
    additionalDrivers?: number;
    childSeats?: number;
    gpsDevice?: boolean;
}

type DriversLicenseLight = {
    id: string;
    issued: Date;
    expires: Date;
    pid: string;
    licenseNumber: string;
    userId: User["id"];
    createdAt: Timestamp;
    updatedAt: Timestamp;
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

interface UseFetchDocsWhereResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}
declare function useFetchDocsWhere<T>(db: Firestore, collectionName: FirestoreCollection, whereClauses: WhereClause<T>[], dependencies: any[], setData?: React$1.Dispatch<React$1.SetStateAction<T[] | undefined>>): UseFetchDocsWhereResult<T>;

interface UseFetchDocsResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}
declare function useFetchDocs<T>(db: Firestore, collectionName: FirestoreCollection, setExternalData?: React.Dispatch<React.SetStateAction<T[]>> | React.Dispatch<React.SetStateAction<T[] | undefined>>): UseFetchDocsResult<T>;

interface UseFetchDocResult<T> {
    data: T | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T | null>;
}
declare function useFetchDoc<T>(db: Firestore, collectionName: FirestoreCollection, docId: string | undefined, setExternalData?: React.Dispatch<React.SetStateAction<T | undefined>>): UseFetchDocResult<T>;

declare const vehicleList: readonly ["type", "someType"];

export { CREDIT_GRADE, type CarDeliverAgreement, type CarPickupAgreement, type Contract, type CreateDamageParams, type CreateDamageResponse, type CreateReservationParams, type CreateReservationResponse, type CreateUserParams, type CreateUserResponse, type CreateVehicleParams, type CreateVehicleResponse, type CreditCheckResponse, type Damage, type DriversLicense, type DriversLicenseLight, type FirestoreCollection, type GetReservationsParams, type GetReservationsResponse, type GetVehicleInfoParams, type GetVehicleInfoResponse, type InsurancePlan, type Location, type LocationService, type RentalExtras, type Reservation, type ResponseCode, type SetPaymentStatusParams, type SetPaymentStatusResponse, type Subset, type UpdateProfileParams, type UpdateProfileResponse, type UpdateVehicleParams, type UpdateVehicleResponse, type User, type UserStoragePath, type Vehicle, type VehicleClasses, type VehicleType, type WhereClause, type WhereFilterOpType, callFunction, errorCodes, firestoreCollections, formatDate, getDocsWhere, internalErrorCodes, successCodes, timestampToDate, useFetchDoc, useFetchDocs, useFetchDocsWhere, useScrollToTop, userStoragePath, vehicleClasses, vehicleList, vehicleTypes };
