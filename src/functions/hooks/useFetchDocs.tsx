import { useEffect, useCallback, useState } from "react";
import { collection, Firestore, getDocs, QueryConstraint, query } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

type SetDataFunction<T> = React.Dispatch<React.SetStateAction<T[] | undefined>> | ((data: T[] | undefined) => void);

interface UseFetchDocsResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}

export function useFetchDocs<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    queryConstraints: QueryConstraint[] = [],
    setExternalData?: SetDataFunction<T>,
): UseFetchDocsResult<T> {
    const [internalData, setInternalData] = useState<T[]>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            const collectionRef = collection(db, collectionName);
            const queryRef = query(collectionRef, ...queryConstraints);
            const snapshot = await getDocs(queryRef);

            if (!snapshot.empty) {
                const newData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }) as T);

                setInternalData(newData);
                setExternalData?.(newData);
                return newData;
            } else {
                const newData: T[] = [];
                setInternalData(newData);
                setExternalData?.(newData);
                setError(`No documents found in ${collectionName}`);
                return null;
            }
        } catch (err) {
            const newData = undefined;
            setInternalData(newData);
            setExternalData?.(newData);
            setError(`Error fetching documents: ${err}`);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, queryConstraints, setExternalData]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs]);

    return {
        data: internalData,
        error,
        isLoading,
        refetch: fetchDocs,
    };
}