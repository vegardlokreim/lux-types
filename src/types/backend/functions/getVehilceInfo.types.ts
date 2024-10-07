import {Vehicle} from "../firestore/Vehicle";

export type GetVehicleInfoParams = { regId: Vehicle["regId"] };

export type GetVehicleInfoResponse = { code: 200, vehicleInfo: any }; // TODO: add type for this response