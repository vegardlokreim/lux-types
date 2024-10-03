import { Vehicle } from "../firestore/Vehicle";
import { ResponseCode } from "../ResponseCodes";

export type CreateVehicleParams = Omit<Vehicle, "id" | "createdAt" | "updatedAt">

export type CreateVehicleResponse = {
    code: ResponseCode;
    id: Vehicle['id'];
    message: string;
}