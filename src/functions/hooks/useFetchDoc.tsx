import { useEffect } from "react";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { FirestoreCollection } from "../../types/comonTypes";

// Hook for fetching and setting Firestore document data
export function useFetchDoc<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    docId: string | undefined,
    setData: React.Dispatch<React.SetStateAction<T | undefined>>,
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>, // Error state setter
) {
    useEffect( () => {
        const fetchDocData = async () => {
            try {
                if (!docId) return;
                const docRef = doc( db, collectionName, docId );
                const docSnapshot = await getDoc( docRef );

                if (docSnapshot.exists()) {
                    setData( docSnapshot.data() as T ); // Casting data to generic type T
                } else {
                    setError && setError( `Document with ID ${ docId } not found in ${ collectionName }` );
                }
            } catch (err) {
                setError && setError( `Error fetching document: ${ err }` );
            }
        };

        fetchDocData();
    }, [ docId, collectionName, setData, setError ] );
}