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
  CREDIT_GRADE: () => CREDIT_GRADE,
  callFunction: () => callFunction,
  errorCodes: () => errorCodes,
  firestoreCollections: () => firestoreCollections,
  formatDate: () => formatDate,
  getDocsWhere: () => getDocsWhere,
  internalErrorCodes: () => internalErrorCodes,
  successCodes: () => successCodes,
  timestampToDate: () => timestampToDate,
  useFetchDoc: () => useFetchDoc,
  useFetchDocs: () => useFetchDocs,
  useFetchDocsWhere: () => useFetchDocsWhere,
  useScrollToTop: () => useScrollToTop,
  userStoragePath: () => userStoragePath,
  vehicleClasses: () => vehicleClasses,
  vehicleList: () => vehicleList,
  vehicleTypes: () => vehicleTypes
});
module.exports = __toCommonJS(src_exports);

// src/types/backend/firestore/VehicleTypes.ts
var vehicleTypes = ["car", "bike", "bus"];

// src/functions/getDocsWhere.ts
var import_firestore = require("firebase/firestore");
async function getDocsWhere(db, collectionName, whereClauses, dontThrow = true) {
  const collectionRef = (0, import_firestore.collection)(db, collectionName);
  let q = (0, import_firestore.query)(collectionRef);
  whereClauses.forEach(([field, op, value]) => {
    q = (0, import_firestore.query)(q, (0, import_firestore.where)(field, op, value));
  });
  try {
    const querySnapshot = await (0, import_firestore.getDocs)(q);
    if (querySnapshot.empty && !dontThrow) throw new Error(`No documents found in collection ${collectionName} with the provided criteria`);
    return querySnapshot.docs.map((doc2) => ({
      ref: doc2,
      data: doc2.data()
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
function timestampToDate(timestamp, throwError = false) {
  if (!timestamp) {
    if (!throwError) return /* @__PURE__ */ new Date(0);
    throw new Error("Timestamp is undefined");
  }
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

// src/functions/hooks/useScrollToTop.tsx
var import_react = require("react");
function useScrollToTop() {
  (0, import_react.useEffect)(() => {
    window.scrollTo(0, 0);
  }, []);
}

// src/functions/hooks/useFetchDocsWhere.tsx
var import_react2 = require("react");
function useFetchDocsWhere(db, collectionName, whereClauses, dependencies, setData) {
  const [internalData, setInternalData] = (0, import_react2.useState)();
  const [internalError, setInternalError] = (0, import_react2.useState)();
  const [isLoading, setIsLoading] = (0, import_react2.useState)(true);
  const fetchDocs = (0, import_react2.useCallback)(async () => {
    setIsLoading(true);
    try {
      const docs = await getDocsWhere(db, collectionName, whereClauses);
      const docData = docs.map((doc2) => doc2.data);
      setInternalData(docData);
      setData == null ? void 0 : setData(docData);
      setInternalError(void 0);
      return docs.map((doc2) => doc2.data);
    } catch (err) {
      const errorMessage = `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`;
      setInternalError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, JSON.stringify(whereClauses), setData]);
  (0, import_react2.useEffect)(() => {
    fetchDocs();
  }, [fetchDocs, ...dependencies]);
  return {
    data: internalData,
    error: internalError,
    isLoading,
    refetch: fetchDocs
  };
}

// src/functions/hooks/useFetchDocs.tsx
var import_react3 = require("react");
var import_firestore2 = require("firebase/firestore");
function useFetchDocs(db, collectionName, setExternalData) {
  const [internalData, setInternalData] = (0, import_react3.useState)();
  const [error, setError] = (0, import_react3.useState)();
  const [isLoading, setIsLoading] = (0, import_react3.useState)(true);
  const fetchDocs = (0, import_react3.useCallback)(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      const collectionRef = (0, import_firestore2.collection)(db, collectionName);
      const queryRef = (0, import_firestore2.query)(collectionRef);
      const snapshot = await (0, import_firestore2.getDocs)(queryRef);
      if (!snapshot.empty) {
        const newData = snapshot.docs.map((doc2) => ({
          id: doc2.id,
          ...doc2.data()
        }));
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return newData;
      } else {
        const newData = [];
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        setError(`No documents found in ${collectionName}`);
        return null;
      }
    } catch (err) {
      const newData = [];
      setInternalData(newData);
      setExternalData == null ? void 0 : setExternalData(newData);
      setError(`Error fetching documents: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, setExternalData]);
  (0, import_react3.useEffect)(() => {
    fetchDocs();
  }, [fetchDocs]);
  return {
    data: internalData,
    error,
    isLoading,
    refetch: fetchDocs
  };
}

// src/functions/hooks/useFetchDoc.tsx
var import_react4 = require("react");
var import_firestore3 = require("firebase/firestore");
function useFetchDoc(db, collectionName, docId, setExternalData) {
  const [internalData, setInternalData] = (0, import_react4.useState)();
  const [error, setError] = (0, import_react4.useState)();
  const [isLoading, setIsLoading] = (0, import_react4.useState)(true);
  const fetchDocData = (0, import_react4.useCallback)(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      if (!docId) {
        setInternalData(void 0);
        setExternalData == null ? void 0 : setExternalData(void 0);
        return null;
      }
      const docRef = (0, import_firestore3.doc)(db, collectionName, docId);
      const docSnapshot = await (0, import_firestore3.getDoc)(docRef);
      if (docSnapshot.exists()) {
        const newData = {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return newData;
      } else {
        setInternalData(void 0);
        setExternalData == null ? void 0 : setExternalData(void 0);
        setError(`Document with ID ${docId} not found in ${collectionName}`);
        return null;
      }
    } catch (err) {
      setInternalData(void 0);
      setExternalData == null ? void 0 : setExternalData(void 0);
      setError(`Error fetching document: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, docId, setExternalData]);
  (0, import_react4.useEffect)(() => {
    fetchDocData();
  }, [fetchDocData]);
  return {
    data: internalData,
    error,
    isLoading,
    refetch: fetchDocData
  };
}

// src/types/backend/consts.ts
var successCodes = [201, 200];
var errorCodes = [404];
var internalErrorCodes = [500];
var firestoreCollections = [
  "users",
  "userPermissions",
  "vehicles",
  "reservations",
  "driversLicenses",
  "damages",
  "contracts",
  "carDeliveryAgreements",
  "carPickupAgreements"
];
var userStoragePath = [
  "profilePicture",
  "driversLicense",
  "signatures",
  "contracts",
  "carPickupAgreements",
  "carDeliveryAgreements"
];
var CREDIT_GRADE = ["A", "B", "C", "D", "E", "IR", "KS"];

// src/consts/vehicleClasses.ts
var vehicleClasses = ["A1", "A", "B", "C1", "C", "D1", "D", "BE", "C1E", "CE", "D1E", "DE", "M", "S", "T"];

// src/consts/vehicles/vehicleList.ts
var vehicleList = ["type", "someType"];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CREDIT_GRADE,
  callFunction,
  errorCodes,
  firestoreCollections,
  formatDate,
  getDocsWhere,
  internalErrorCodes,
  successCodes,
  timestampToDate,
  useFetchDoc,
  useFetchDocs,
  useFetchDocsWhere,
  useScrollToTop,
  userStoragePath,
  vehicleClasses,
  vehicleList,
  vehicleTypes
});
