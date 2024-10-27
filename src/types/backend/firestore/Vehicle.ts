import { Timestamp } from "firebase-admin/firestore"

import { Damage } from "./Damage"
import { Reservation } from "./Reservation"
import { VehicleType } from "./VehicleTypes"

export type Vehicle = {
  id: string
  type: VehicleType
  transmission: "A" | "M"
  seats: number
  doors: string
  tankVolume?: number
  interiorColor: string
  exteriorColor: string
  category: string // e.g premium
  bodyType: string // e.g sport / suv / pick up
  brand: string // eg. audi
  model: string
  year: number
  regId: string
  thumbnail: string // main image
  vin: string
  fuelType: "gasoline" | "diesel" | "hybrid" | "electric"
  wd: "front" | "back" | "4WD" | "AWD"
  hp: number
  engineVolume: number
  volumeTank: number
  fuelConsumption: number
  l: number
  w: number
  h: number

  weight: number

  prDay: number
  prHour: number
  prWeek: number
  prMonth: number

  cylinderCount: number
  cylinderArrangement: string | null

  displayTariff: "PR_DAY" | "PR_HOUR" | "PR_WEEK" | "PR_MONTH"

  deliverAt: string

  pickupAt: string

  reservations: Array<Reservation["id"]>
  unavailableDates?: Array<{
    from: Timestamp
    to: Timestamp
    reservationId: Reservation["id"]
  }> // Value set by trigger that listens to reservation creation, gets cleaned up when sends a "delivery form"

  createdAt: Timestamp
  updatedAt: Timestamp

  damages: Array<Damage["id"]>

  images?: Array<string>
}
