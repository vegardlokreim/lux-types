export interface InsurancePlan {
  id: string
  name: string
  description: string
  coverage: {
    liability: number
    collision: boolean
    theft: boolean
    personalEffects: boolean
  }
  dailyRate: number
}

export interface LocationService {
  id: string
  type: "PICKUP" | "DELIVERY"
  location: {
    address: string
    latitude: number
    longitude: number
  }
  basePrice: number
  pricePerKm: number
}

export interface RentalExtras {
  insurancePlanId?: string
  customPickup?: LocationService
  customDelivery?: LocationService
  additionalDrivers?: number
  childSeats?: number
  gpsDevice?: boolean
}
