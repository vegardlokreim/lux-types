// src/types/backend/firestore/VehicleTypes.ts
var vehicleTypes = ["car", "bike", "bus"];

// src/functions/getDocsWhere.ts
import { collection, getDocs, query, where } from "firebase/firestore";
async function getDocsWhere(db, collectionName, whereClauses) {
  try {
    const collectionRef = collection(db, collectionName);
    const constraints = whereClauses.map(
      ({ field, operator, value }) => where(field, operator, value)
    );
    const queryRef = query(collectionRef, ...constraints);
    const snapshot = await getDocs(queryRef);
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
import { getFunctions, httpsCallable } from "firebase/functions";
async function callFunction(name, params) {
  const functions = getFunctions();
  const func = httpsCallable(functions, name);
  const response = params ? await func(params) : await func();
  return response.data;
}

// src/functions/hooks/useScrollToTop.tsx
import { useEffect } from "react";
function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

// src/functions/hooks/useFetchDocsWhere.tsx
import { useEffect as useEffect2, useCallback, useState } from "react";
function useFetchDocsWhere(db, collectionName, whereClauses, setExternalData, dependencies = []) {
  const [internalData, setInternalData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchDocs = useCallback(async () => {
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
  useEffect2(() => {
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
import { useEffect as useEffect3, useCallback as useCallback2, useState as useState2 } from "react";
import { collection as collection2, getDocs as getDocs2, query as query2 } from "firebase/firestore";
function useFetchDocs(db, collectionName, queryConstraints = [], setExternalData) {
  const [internalData, setInternalData] = useState2();
  const [error, setError] = useState2();
  const [isLoading, setIsLoading] = useState2(true);
  const fetchDocs = useCallback2(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      const collectionRef = collection2(db, collectionName);
      const queryRef = query2(collectionRef, ...queryConstraints);
      const snapshot = await getDocs2(queryRef);
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
  useEffect3(() => {
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
import { useEffect as useEffect4, useCallback as useCallback3, useState as useState3 } from "react";
import { doc, getDoc } from "firebase/firestore";
function useFetchDoc(db, collectionName, docId, setExternalData) {
  const [internalData, setInternalData] = useState3();
  const [error, setError] = useState3();
  const [isLoading, setIsLoading] = useState3(true);
  const fetchDocData = useCallback3(async () => {
    setIsLoading(true);
    setError(void 0);
    try {
      if (!docId) {
        const newData = void 0;
        setInternalData(newData);
        setExternalData == null ? void 0 : setExternalData(newData);
        return null;
      }
      const docRef = doc(db, collectionName, docId);
      const docSnapshot = await getDoc(docRef);
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
  useEffect4(() => {
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
export {
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
};
