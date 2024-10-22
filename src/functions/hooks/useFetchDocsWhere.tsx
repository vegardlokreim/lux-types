import React, { useEffect, useCallback } from "react";
import { getDocsWhere, WhereClause } from "../getDocsWhere";
import { Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

export function useFetchDocsWhere<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    whereClauses: WhereClause<T>[],
    setData: React.Dispatch<React.SetStateAction<T[] | undefined>>,
    dependencies = [] as any[],
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
    const fetchDocs = useCallback(async () => {
        try {
            const docs = await getDocsWhere<T>(db, collectionName, whereClauses);
            setData(docs.map(doc => doc.data));
            return docs; // Return the docs in case the caller needs them
        } catch (err) {
            setError?.(
                `Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`
            );
            throw err; // Rethrow to allow error handling by the caller
        }
    }, [db, collectionName, JSON.stringify(whereClauses), setData, setError]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs, ...dependencies]);

    return { refetch: fetchDocs };
}