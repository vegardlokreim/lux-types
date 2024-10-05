// src/types/backend/firestore/VehicleTypes.ts
var vehicleTypes = ["car", "bike", "bus"];

// src/functions/timestampToDate.ts
function timestampToDate(timestamp) {
  return new Date(timestamp.seconds * 1e3 + timestamp.nanoseconds / 1e6);
}

// src/functions/callFunction.ts
import { getFunctions, httpsCallable } from "firebase/functions";
async function callFunction(name, params) {
  const functions = getFunctions();
  const func = httpsCallable(functions, name);
  const response = params ? await func(params) : await func();
  return response.data;
}

// src/types/backend/consts.ts
var successCodes = [201, 200];
var errorCodes = [404];
var internalErrorCodes = [500];

// src/consts/vehicles/vehicleList.ts
var vehicleList = ["type", "someType"];

// src/consts/someFolder/someConst.ts
var someConst = ["nabo", "restaurant"];
export {
  callFunction,
  errorCodes,
  internalErrorCodes,
  someConst,
  successCodes,
  timestampToDate,
  vehicleList,
  vehicleTypes
};
