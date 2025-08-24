import type { RoomKey } from "@/data/data"

export interface IRoom {
  room: RoomKey,
  name: string,
  quantity: number,
  night: number,
  price: number
  afterPrice:number
}