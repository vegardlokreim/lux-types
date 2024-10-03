export const vehicleTypes = ["car", "bike"] as const
export type VehicleType = typeof vehicleTypes[number]