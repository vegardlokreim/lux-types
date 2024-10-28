export const successCodes = [201, 200] as const
export const errorCodes = [404] as const
export const internalErrorCodes = [500] as const

export const firestoreCollections = [
  "users",
  "userPermissions",
  "vehicles",
  "reservations",
  "driversLicenses",
  "damages",
  "contracts",
  "carDeliveryAgreements",
  "carPickupAgreements",
] as const

export const userStoragePath = [
  "profilePicture",
  "driversLicense",
  "signatures",
  "contracts",
  "carPickupAgreements",
  "carDeliveryAgreements",
] as const

export const CREDIT_GRADE = ["A", "B", "C", "D", "E", "IR", "KS"] as const
