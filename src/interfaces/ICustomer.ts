import type { IRoom } from "./IRoom"

export interface ICustomer {
  name: string,
  tel: string,
  dateIn: string,
  dateOut: string,
  totalNight: number,
  rooms: IRoom[]
  totalPrice: number,
  totalDiscount: number
}