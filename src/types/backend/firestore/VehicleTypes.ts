export const vehicleTypes = ["car", "bike", "bus"] as const
export type VehicleType = typeof vehicleTypes[number]
