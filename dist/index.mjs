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
function useFetchDocsWhere(db, collectionName, whereClauses, setData, dependencies = [], setError) {
  const [isLoading, setIsLoading] = useState(true);
  const fetchDocs = useCallback(async () => {
    setIsLoading(true);
    try {
      const docs = await getDocsWhere(db, collectionName, whereClauses);
      setData(docs.map((doc2) => doc2.data));
      setError == null ? void 0 : setError(void 0);
      return docs;
    } catch (err) {
      setError == null ? void 0 : setError(
        `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, JSON.stringify(whereClauses), setData, setError]);
  useEffect2(() => {
    fetchDocs();
  }, [fetchDocs, ...dependencies]);
  return { refetch: fetchDocs, isLoading };
}

// src/functions/hooks/useFetchDocs.tsx
import { useEffect as useEffect3, useCallback as useCallback2, useState as useState2 } from "react";
import { collection as collection2, getDocs as getDocs2 } from "firebase/firestore";
function useFetchDocs(db, collectionName, setData, setError) {
  const [isLoading, setIsLoading] = useState2(true);
  const fetchDocs = useCallback2(async () => {
    setIsLoading(true);
    try {
      const snap = await getDocs2(collection2(db, collectionName));
      if (snap.docs.length) {
        const data = snap.docs.map((doc2) => doc2.data());
        setData(data);
        setError(void 0);
        return data;
      } else {
        setData([]);
        setError(`No documents in ${collectionName}`);
        return [];
      }
    } catch (err) {
      setError(`Error fetching document: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, setData, setError]);
  useEffect3(() => {
    fetchDocs();
  }, [fetchDocs]);
  return { refetch: fetchDocs, isLoading };
}

// src/functions/hooks/useFetchDoc.tsx
import { useEffect as useEffect4, useCallback as useCallback3, useState as useState3 } from "react";
import { doc, getDoc } from "firebase/firestore";
function useFetchDoc(db, collectionName, docId, setData, setError) {
  const [isLoading, setIsLoading] = useState3(true);
  const fetchDocData = useCallback3(async () => {
    setIsLoading(true);
    try {
      if (!docId) {
        setData(void 0);
        setError == null ? void 0 : setError(void 0);
        return null;
      }
      const docRef = doc(db, collectionName, docId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setData(data);
        setError == null ? void 0 : setError(void 0);
        return data;
      } else {
        setData(void 0);
        setError == null ? void 0 : setError(`Document with ID ${docId} not found in ${collectionName}`);
        return null;
      }
    } catch (err) {
      setData(void 0);
      setError == null ? void 0 : setError(`Error fetching document: ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [db, collectionName, docId, setData, setError]);
  useEffect4(() => {
    fetchDocData();
  }, [fetchDocData]);
  return { refetch: fetchDocData, isLoading };
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
