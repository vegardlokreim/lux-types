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
function useFetchDocsWhere(db, collectionName, whereClauses, setData, dependencies = [], setError) {
  const fetchDocs = async () => {
    try {
      const docs = await getDocsWhere(db, collectionName, whereClauses);
      setData(docs.map((doc2) => doc2.data));
    } catch (err) {
      setError && setError(`Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`);
    }
  };
  (0, import_react2.useEffect)(() => {
    fetchDocs();
  }, [collectionName, setData, setError, ...dependencies]);
}

// src/functions/hooks/useFetchDocs.tsx
var import_react3 = require("react");
var import_firestore2 = require("firebase/firestore");
function useFetchDocs(db, collectionName, setData, setError) {
  const fetchDocs = async () => {
    try {
      const snap = await (0, import_firestore2.getDocs)((0, import_firestore2.collection)(db, collectionName));
      if (snap.docs.length) {
        setData(snap.docs.map((doc2) => doc2.data()));
      } else {
        setData([]);
        setError(`No documents in ${collectionName}`);
      }
    } catch (err) {
      setError(`Error fetching document: ${err}`);
    }
  };
  (0, import_react3.useEffect)(() => {
    fetchDocs();
  }, [collectionName, setData, setError]);
}

// src/functions/hooks/useFetchDoc.tsx
var import_react4 = require("react");
var import_firestore3 = require("firebase/firestore");
function useFetchDoc(db, collectionName, docId, setData, setError) {
  (0, import_react4.useEffect)(() => {
    const fetchDocData = async () => {
      try {
        if (!docId) return;
        const docRef = (0, import_firestore3.doc)(db, collectionName, docId);
        const docSnapshot = await (0, import_firestore3.getDoc)(docRef);
        if (docSnapshot.exists()) {
          setData(docSnapshot.data());
        } else {
          setError && setError(`Document with ID ${docId} not found in ${collectionName}`);
        }
      } catch (err) {
        setError && setError(`Error fetching document: ${err}`);
      }
    };
    fetchDocData();
  }, [docId, collectionName, setData, setError]);
}

// src/types/backend/consts.ts
var successCodes = [201, 200];
var errorCodes = [404];
var internalErrorCodes = [500];
var firestoreCollections = ["users", "userPermissions", "vehicles", "reservations", "driversLicenses", "damages"];

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
  vehicleClasses,
  vehicleList,
  vehicleTypes
});
