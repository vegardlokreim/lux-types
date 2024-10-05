import { Timestamp } from "firebase-admin/firestore";

export function timestampToDate(timestamp: Timestamp): Date {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}