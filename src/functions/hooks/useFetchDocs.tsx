import React, { useEffect } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

export function useFetchDocs<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    setData: React.Dispatch<React.SetStateAction<T[]>> | React.Dispatch<React.SetStateAction<T[] | undefined>>,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>, // Error state setter
) {
    const fetchDocs = async () => {
        try {
            const snap = await getDocs( collection( db, collectionName ) );

            if (snap.docs.length) {
                setData( snap.docs.map( doc => doc.data() as T ) );
            } else {
                setData( [] )
                setError( `No documents in ${ collectionName }` );
            }
        } catch (err) {
            setError( `Error fetching document: ${ err }` );
        }
    };

    useEffect( () => {
        fetchDocs();
    }, [ collectionName, setData, setError ] );
}
