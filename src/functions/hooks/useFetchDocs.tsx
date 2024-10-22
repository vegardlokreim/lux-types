import React, { useEffect, useCallback, useState } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

export function useFetchDocs<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    setData: React.Dispatch<React.SetStateAction<T[]>> | React.Dispatch<React.SetStateAction<T[] | undefined>>,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = useCallback(async () => {
        setIsLoading(true);
        try {
            const snap = await getDocs(collection(db, collectionName));

            if (snap.docs.length) {
                const data = snap.docs.map(doc => doc.data() as T);
                setData(data);
                setError(undefined);
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

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs]);

    return { refetch: fetchDocs, isLoading };
}