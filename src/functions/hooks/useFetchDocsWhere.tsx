import { useEffect } from 'react';
import { getDocsWhere, WhereClause } from '../getDocsWhere';
import { Firestore } from 'firebase/firestore';
import { FirestoreCollection } from '../../types/comonTypes';

function useFetchDocsWhere<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    whereClauses: WhereClause<T>[],
    setData: React.Dispatch<React.SetStateAction<T[] | undefined>>,
    setError?: React.Dispatch<React.SetStateAction<string | undefined>> // Error state setter
) {

    const fetchDocs = async () => {
        try {
            const docs = await getDocsWhere<T>(db, collectionName, whereClauses);
            setData(docs.map(doc => doc.data))
        } catch (err) {
            setError && setError(`Error while fetching docs from collection ${collectionName} where ${JSON.stringify(whereClauses)}. Error: ${err}`)
        }
    };

    useEffect(() => {
        fetchDocs();
    }, [collectionName, setData, setError]);
}

export default useFetchDocsWhere;
