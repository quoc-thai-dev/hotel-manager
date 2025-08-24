import { ChevronDownIcon } from "lucide-react";

import { Calendar, CalendarDayButton } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select } from "../ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ICustomer, IRoom } from "@/interfaces";
import { roomData as data, type RoomDataType, type RoomKey } from "@/data/data";
const priceMap: Record<string, string> = {
  // Chèn vào đây dữ liệu giá cho từng ngày theo định dạng ISO: "YYYY-MM-DD": "₫xxx"
  // Ví dụ:
  "2025-08-20": "500k",
  // ...
};
type TSelectRoom = {
  customer: ICustomer;
  setData: Dispatch<SetStateAction<ICustomer>>;
};
const SelectRoom = ({ customer, setData }: TSelectRoom) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[] | undefined>(
    undefined
  );
  const [roomData, setRoomData] = useState<IRoom>({
    room: "",
    name: "",
    quantity: 1,
    night: 1,
    price: 0,
    afterPrice: 0,
  });
  const calcTotal = () => {
    if (selectedDates && selectedDates?.length > 0) {
      const price =
        (getPrice(roomData.room, selectedDates[0], true) as number) *
        roomData.price *
        roomData.quantity;
      // setRoomData((prev) => ({
      //   ...prev,
      //   price,
      // }));
    }
  };
  const getPrice = (key: RoomKey, date: Date, raw?: Boolean) => {
    const day = date.getDay(); // 0 = Chủ Nhật, 6 = Thứ 7
    if (raw)
      return [0, 6, 5].includes(day) ? data[key].gia_ct : data[key].gia_dt;
    return [0, 6, 5].includes(day)
      ? formatter.format(data[key].gia_ct)
      : formatter.format(data[key].gia_dt);
  };
  const handleSelect: Parameters<typeof Calendar>["0"]["onSelect"] = (
    dates,
    clickedDate,
    modifiers,
    e
  ) => {
    // dates có thể là undefined hoặc Date[]
    setSelectedDates(dates);
  };
  const handleSelectRoom = (value: RoomKey) => {
    // setRoomType(value);
    setRoomData((prev) => {
      const updated = {
        ...prev,
        room: value,
      };
      const total = getPrice(value ,new Date(),true) as number *updated.quantity * updated.night
      return {
        ...updated,
        price: total,
      };
    });
  };
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 3,
  });
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // ép kiểu số, tránh NaN (nếu rỗng thì cho 0)
    const newValue = parseInt(value) || 0;
    setRoomData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };
      const total = getPrice(roomData.room ,new Date(),true) as number *updated.quantity * updated.night
      return {
        ...updated,
        price: total,
      };
    });
  };
  return (
    <>
      <hr className="my-5" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3 items-center">
        <div className="flex flex-col gap-2">
          <Label>Chọn hạng phòng</Label>
          <Select onValueChange={handleSelectRoom}>
            <SelectTrigger className="w-full bg-sky-100 border-2 border-gray-300">
              <SelectValue placeholder="Phòng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="601">✨️VIP 1</SelectItem>
              <SelectItem value="501">✨️VIP 2</SelectItem>
              <SelectItem value="401">✨️VIP 3</SelectItem>
              <SelectItem value="dv">Đơn view 🛏️🌳</SelectItem>
              <SelectItem value="2tc">Đơn TC 🛏️ </SelectItem>
              <SelectItem value="4tc">Đôi TC 🛏️🛏️ </SelectItem>
              <SelectItem value="gd">👪 Gia đình 👪</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Số phòng</Label>
          <Input
            type="number"
            name="quantity"
            min={1}
            max={30}
            value={roomData.quantity}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Số đêm</Label>
          <Input
            type="number"
            min={1}
            max={30}
            name="night"
            value={roomData.night}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Giá</Label>
          <Input type="text" readOnly name="price" value={roomData.price} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="date-picker" className="px-1 col-span-1">
            Chọn ngày
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                disabled={roomData.room == ""}
                className="w-full bg-sky-100 justify-between font-normal cursor-pointer"
              >
                {selectedDates && selectedDates.length > 0
                  ? selectedDates.map((d) => d.getDate()).join(", ")
                  : "Chọn ngày"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={handleSelect}
                modifiers={{
                  sunday: { dayOfWeek: [0] },
                }}
                modifiersStyles={{
                  sunday: { color: "red" },
                }}
                components={{
                  DayButton: ({ day, children, modifiers, ...props }) => {
                    return (
                      <CalendarDayButton
                        day={day}
                        modifiers={modifiers}
                        {...props}
                      >
                        <div className="flex flex-col items-center px-2 py-1">
                          {children}
                          <span
                            className={`mt-1 text-[.6rem] ${
                              getPrice(roomData.room, day.date) === "500k"
                                ? " text-red-700"
                                : " text-sky-700"
                            } `}
                          >
                            {getPrice(roomData.room, day.date)}
                          </span>
                        </div>
                      </CalendarDayButton>
                    );
                  },
                }}
                disabled={(date) =>
                  date < new Date(new Date().setDate(new Date().getDate() - 1))
                } // Vô hiệu hóa các ngày trước ngày hiện tại
                // excludeDisabled
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default SelectRoom;
