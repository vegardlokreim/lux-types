import { Timestamp } from "firebase-admin/firestore"

import { Location } from "../../comonTypes"
import { CarDeliverAgreement } from "./CarDeliverAgreement"
import { CarPickupAgreement } from "./CarPickupAgreement"
import { Contract } from "./Contract"
import { User } from "./User"
import { Vehicle } from "./Vehicle"

export type Reservation = {
  id: string

  user: User["id"]
  vehicle: Vehicle["id"]

  userDoc: User
  vehicleDoc: Vehicle

  isPaid: boolean
  paymentMethod: 'card' | 'cash' | 'invoice'

  subtotal: number
  securityAmount: number

  insurances: {
    insuranceName: string,
    insuranceType: string,
    insuranceAmount: number // price per day
  }[]


  confirmed: boolean

  to: Timestamp
  from: Timestamp

  duration: {
    days: number
    hours: number
  }

  agreedPickupLocation: Location
  agreedDeliverLocation: Location

  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy?: User["id"]

  contract?: Contract["id"]
  carPickupAgreement?: CarPickupAgreement["id"]
  carDeliverAgreement?: CarDeliverAgreement["id"]

  includedKm: number
  additionalKm: number

  isCustomContract?: {
    custommContract: boolean
    customSecurityAmount: number
    customSubtotal: number
    customIncludedKm: number
    customMessage: string;
    customInsuranceTotal: number
  }

  contractUrl?: string
}
