"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  callFunction: () => callFunction,
  errorCodes: () => errorCodes,
  formatDate: () => formatDate,
  internalErrorCodes: () => internalErrorCodes,
  someConst: () => someConst,
  successCodes: () => successCodes,
  timestampToDate: () => timestampToDate,
  vehicleList: () => vehicleList,
  vehicleTypes: () => vehicleTypes
});
module.exports = __toCommonJS(src_exports);

// src/types/backend/firestore/VehicleTypes.ts
var vehicleTypes = ["car", "bike", "bus"];

// src/functions/timestampToDate.ts
function timestampToDate(timestamp) {
  return new Date(timestamp.seconds * 1e3 + timestamp.nanoseconds / 1e6);
}

// src/functions/formatDate.ts
function formatDate(date, locale, compress = false) {
  const options = { year: compress ? "2-digit" : "numeric", month: compress ? "numeric" : "short", day: "2-digit", hour: "numeric", minute: "numeric" };
  return date.toLocaleDateString(locale, options);
}

// src/functions/callFunction.ts
var import_functions = require("firebase/functions");
async function callFunction(name, params) {
  const functions = (0, import_functions.getFunctions)();
  const func = (0, import_functions.httpsCallable)(functions, name);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callFunction,
  errorCodes,
  formatDate,
  internalErrorCodes,
  someConst,
  successCodes,
  timestampToDate,
  vehicleList,
  vehicleTypes
});
