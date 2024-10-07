// src/types/backend/firestore/VehicleTypes.ts
var vehicleTypes = ["car", "bike", "bus"];

// src/functions/getDocsWhere.ts
import { collection, getDocs, query, where } from "firebase/firestore";
async function getDocsWhere(db, collectionName, whereClauses, dontThrow = true) {
  const collectionRef = collection(db, collectionName);
  let q = query(collectionRef);
  whereClauses.forEach(([field, op, value]) => {
    q = query(q, where(field, op, value));
  });
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty && !dontThrow) throw new Error(`No documents found in collection ${collectionName} with the provided criteria`);
    return querySnapshot.docs.map((doc) => ({
      ref: doc,
      data: doc.data()
    }));
  } catch (error) {
    if (dontThrow) {
      console.warn(`Error fetching documents from collection ${collectionName}:`, error);
      return [];
    }
    throw error;
  }
}

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
var firestoreCollections = ["users", "usersPermissions", "vehicles", "reservations", "driversLicenses"];

// src/consts/vehicleClasses.ts
var vehicleClasses = ["A1", "A", "B", "C1", "C", "D1", "D", "BE", "C1E", "CE", "D1E", "DE", "M", "S", "T"];

// src/consts/vehicles/vehicleList.ts
var vehicleList = ["type", "someType"];
export {
  callFunction,
  errorCodes,
  firestoreCollections,
  formatDate,
  getDocsWhere,
  internalErrorCodes,
  successCodes,
  timestampToDate,
  vehicleClasses,
  vehicleList,
  vehicleTypes
};
