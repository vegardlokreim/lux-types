import { useEffect, useCallback, useState } from "react";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

type SetDataFunction<T> = React.Dispatch<React.SetStateAction<T | undefined>> | ((data: T | undefined) => void);

interface UseFetchDocResult<T> {
    data: T | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T | null>;
}

export function useFetchDoc<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    docId: string | undefined,
    setExternalData?: SetDataFunction<T>,
): UseFetchDocResult<T> {
    const [internalData, setInternalData] = useState<T>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocData = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            if (!docId) {
                const newData = undefined;
                setInternalData(newData);
                setExternalData?.(newData);
                return null;
            }

            const docRef = doc(db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const newData = docSnapshot.data() as T;
                setInternalData(newData);
                setExternalData?.(newData);
                return newData;
            } else {
                const newData = undefined;
                setInternalData(newData);
                setExternalData?.(newData);
                setError(`Document with ID ${docId} not found in ${collectionName}`);
                return null;
            }
        } catch (err) {
            const newData = undefined;
            setInternalData(newData);
            setExternalData?.(newData);
            setError(`Error fetching document: ${err}`);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, docId, setExternalData]);

    useEffect(() => {
        fetchDocData();
    }, [fetchDocData]);

    return {
        data: internalData,
        error,
        isLoading,
        refetch: fetchDocData,
    };
}