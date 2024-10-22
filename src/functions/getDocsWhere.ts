import { collection, getDocs, query, where, WhereFilterOp, Firestore } from "firebase/firestore";
import { FirestoreCollection } from "../types/comonTypes";

export type WhereClause<T> = {
    field: keyof T;
    operator: WhereFilterOp;
    value: any;
};

export async function getDocsWhere<T>(
    db: Firestore,
    collectionName: FirestoreCollection,
    whereClauses: WhereClause<T>[]
): Promise<Array<{ id: string; data: T }>> {
    try {
        const collectionRef = collection(db, collectionName);

        const constraints = whereClauses.map(({ field, operator, value }) =>
            where(field as string, operator, value)
        );

        const queryRef = query(collectionRef, ...constraints);
        const snapshot = await getDocs(queryRef);

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(doc => ({
            id: doc.id,
            data: { ...doc.data(), id: doc.id } as T
        }));
    } catch (error) {
        throw new Error(`Error in getDocsWhere: ${error}`);
    }
}