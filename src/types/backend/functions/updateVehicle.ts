import { Subset } from "../../comonTypes";
import { Vehicle } from "../firestore/Vehicle";
import { ResponseCode } from "../ResponseCodes";

export type UpdateVehicleParams = {
    id: Vehicle['id'];
    vehicleData: Omit<Subset<Vehicle>, "id" | "createdAt" | "updatedAt">
}

export type UpdateVehicleResponse = {
    code: ResponseCode;
    message: string;

}