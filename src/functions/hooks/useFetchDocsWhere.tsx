import { useEffect, useCallback, useState, DependencyList } from "react";
import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";
import { getDocsWhere, WhereClause } from "../getDocsWhere";

type SetDataFunction<T> = React.Dispatch<React.SetStateAction<T[] | undefined>> | ((data: T[] | undefined) => void);

interface UseFetchDocsWhereResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<Array<{ id: string; data: T }> | null>;
}

export function useFetchDocsWhere<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    whereClauses: WhereClause<T>[],
    setExternalData?: SetDataFunction<T>,
    dependencies: DependencyList = [],
): UseFetchDocsWhereResult<T> {
    const [internalData, setInternalData] = useState<T[]>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = useCallback(async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            const docs = await getDocsWhere<T>(db, collectionName, whereClauses);

            if (docs.length > 0) {
                const newData = docs.map(doc => doc.data);
                setInternalData(newData);
                setExternalData?.(newData);
                return docs;
            } else {
                const newData: T[] = [];
                setInternalData(newData);
                setExternalData?.(newData);
                setError(`No documents found in ${collectionName} matching the specified criteria`);
                return null;
            }
        } catch (err) {
            const newData = undefined;
            setInternalData(newData);
            setExternalData?.(newData);
            setError(
                `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, JSON.stringify(whereClauses), setExternalData]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs, ...dependencies]);

    return {
        data: internalData,
        error,
        isLoading,
        refetch: fetchDocs,
    };
}