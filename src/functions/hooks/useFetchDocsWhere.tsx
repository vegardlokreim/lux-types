import React, { useEffect, useCallback, useState } from "react";
import { getDocsWhere, WhereClause } from "../getDocsWhere";
import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

interface UseFetchDocsWhereResult<T> {
    data: T[] | undefined;
    error: string | undefined;
    isLoading: boolean;
    refetch: () => Promise<T[] | null>;
}

export function useFetchDocsWhere<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    whereClauses: WhereClause<T>[],
    setData: React.Dispatch<React.SetStateAction<T[] | undefined>>,
    dependencies = [] as any[],
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>,
): UseFetchDocsWhereResult<T> {
    const [internalData, setInternalData] = useState<T[] | undefined>();
    const [internalError, setInternalError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = useCallback(async () => {
        setIsLoading(true);
        try {
            const docs = await getDocsWhere<T>(db, collectionName, whereClauses);
            const docData = docs.map(doc => doc.data);
            setInternalData(docData);
            setData(docData);
            setError?.(undefined);
            setInternalError(undefined);
            return docs.map(doc => doc.data);
        } catch (err) {
            const errorMessage = `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`;
            setError?.(errorMessage);
            setInternalError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [db, collectionName, JSON.stringify(whereClauses), setData, setError]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs, ...dependencies]);

    return {
        data: internalData,
        error: internalError,
        isLoading,
        refetch: fetchDocs
    };
}