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

// src/functions/hooks/useScrollToTop.tsx
import { useEffect } from "react";
function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

// src/functions/hooks/useFetchDocsWhere.tsx
import { useEffect as useEffect2 } from "react";
function useFetchDocsWhere(db, collectionName, whereClauses, setData, setError) {
  const fetchDocs = async () => {
    try {
      const docs = await getDocsWhere(db, collectionName, whereClauses);
      setData(docs.map((doc2) => doc2.data));
    } catch (err) {
      setError && setError(`Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`);
    }
  };
  useEffect2(() => {
    fetchDocs();
  }, [collectionName, setData, setError]);
}

// src/functions/hooks/useFetchDocs.tsx
import { useEffect as useEffect3 } from "react";
import { collection as collection2, getDocs as getDocs2 } from "firebase/firestore";
function useFetchDocs(db, collectionName, setData, setError) {
  const fetchDocs = async () => {
    try {
      const snap = await getDocs2(collection2(db, collectionName));
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
  useEffect3(() => {
    fetchDocs();
  }, [collectionName, setData, setError]);
}

// src/functions/hooks/useFetchDoc.tsx
import { useEffect as useEffect4 } from "react";
import { doc, getDoc } from "firebase/firestore";
function useFetchDoc(db, collectionName, docId, setData, setError) {
  useEffect4(() => {
    const fetchDocData = async () => {
      try {
        if (!docId) return;
        const docRef = doc(db, collectionName, docId);
        const docSnapshot = await getDoc(docRef);
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
var firestoreCollections = ["users", "usersPermissions", "vehicles", "reservations", "driversLicenses", "usersPermissions"];

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
  vehicleClasses,
  vehicleList,
  vehicleTypes
};
