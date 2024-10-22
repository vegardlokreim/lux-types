import { useEffect, useCallback, useState } from "react";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

export function useFetchDoc<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    docId: string | undefined,
    setData: React.Dispatch<React.SetStateAction<T | undefined>>,
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocData = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!docId) {
                setData(undefined);
                setError?.(undefined);
                return null;
            }

            const docRef = doc(db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const data = docSnapshot.data() as T;
                setData(data);
                setError?.(undefined);
                return data;
            } else {
                setData(undefined);
                setError?.(`Document with ID ${docId} not found in ${collectionName}`);
                return null;
            }
        } catch (err) {
            setData(undefined);
            setError?.(`Error fetching document: ${err}`);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, docId, setData, setError]);

    useEffect(() => {
        fetchDocData();
    }, [fetchDocData]);

    return { refetch: fetchDocData, isLoading };
}