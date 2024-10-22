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
async function getDocsWhere(db, collectionName, whereClauses) {
  try {
    const collectionRef = (0, import_firestore.collection)(db, collectionName);
    const constraints = whereClauses.map(
      ({ field, operator, value }) => (0, import_firestore.where)(field, operator, value)
    );
    const queryRef = (0, import_firestore.query)(collectionRef, ...constraints);
    const snapshot = await (0, import_firestore.getDocs)(queryRef);
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map((doc2) => ({
      id: doc2.id,
      data: { ...doc2.data(), id: doc2.id }
    }));
  } catch (error) {
    throw new Error(`Error in getDocsWhere: ${error}`);
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
function useFetchDocsWhere(db, collectionName, whereClauses, setExternalData, dependencies = []) {
  const [internalData, setInternalData] = (0, import_react2.useState)();
  const [error, setError] = (0, import_react2.useState)();
  const [isLoading, setIsLoading] = (0, import_react2.useState)(true);
  const fetchDocs = (0, import_react2.useCallback)(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      const docs = await getDocsWhere(db, collectionName, whereClauses);
      if (docs.length > 0) {
        const newData = docs.map((doc2) => doc2.data);
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return docs;
      } else {
        const newData = [];
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        setError(`No documents found in ${collectionName} matching the specified criteria`);
        return null;
      }
    } catch (err) {
      const newData = void 0;
      setInternalData(newData);
      setExternalData == null ? void 0 : setExternalData(newData);
      setError(
        `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, JSON.stringify(whereClauses), setExternalData]);
  (0, import_react2.useEffect)(() => {
    fetchDocs();
  }, [fetchDocs, ...dependencies]);
  return {
    data: internalData,
    error,
    isLoading,
    refetch: fetchDocs
  };
}

// src/functions/hooks/useFetchDocs.tsx
var import_react3 = require("react");
var import_firestore2 = require("firebase/firestore");
function useFetchDocs(db, collectionName, queryConstraints = [], setExternalData) {
  const [internalData, setInternalData] = (0, import_react3.useState)();
  const [error, setError] = (0, import_react3.useState)();
  const [isLoading, setIsLoading] = (0, import_react3.useState)(true);
  const fetchDocs = (0, import_react3.useCallback)(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      const collectionRef = (0, import_firestore2.collection)(db, collectionName);
      const queryRef = (0, import_firestore2.query)(collectionRef, ...queryConstraints);
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
      const newData = void 0;
      setInternalData(newData);
      setExternalData == null ? void 0 : setExternalData(newData);
      setError(`Error fetching documents: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, queryConstraints, setExternalData]);
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
        const newData = void 0;
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return null;
      }
      const docRef = (0, import_firestore3.doc)(db, collectionName, docId);
      const docSnapshot = await (0, import_firestore3.getDoc)(docRef);
      if (docSnapshot.exists()) {
        const newData = docSnapshot.data();
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return newData;
      } else {
        const newData = void 0;
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        setError(`Document with ID ${docId} not found in ${collectionName}`);
        return null;
      }
    } catch (err) {
      const newData = void 0;
      setInternalData(newData);
      setExternalData == null ? void 0 : setExternalData(newData);
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
var firestoreCollections = ["users", "userPermissions", "vehicles", "reservations", "driversLicenses", "damages", "contracts", "carDeliveryAgreements", "carPickupAgreements"];
var userStoragePath = ["profilePicture", "driversLicense", "signatures", "contracts", "carPickupAgreements", "carDeliveryAgreements"];

// src/consts/vehicleClasses.ts
var vehicleClasses = ["A1", "A", "B", "C1", "C", "D1", "D", "BE", "C1E", "CE", "D1E", "DE", "M", "S", "T"];

// src/consts/vehicles/vehicleList.ts
var vehicleList = ["type", "someType"];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
