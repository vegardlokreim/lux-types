import { Damage } from "../firestore/Damage";

export type CreateDamageParams = Omit<Damage, "id" | "createdAt" | "updatedAt" | "fixed" | "registeredBy">

export type CreateDamageResponse = {
    code: 201;
    message: string;
}