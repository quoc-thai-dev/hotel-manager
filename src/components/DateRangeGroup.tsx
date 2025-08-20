import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar,CalendarDayButton } from "@/components/ui/calendar";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface InputDateProp {
  inputName: string;
  text: string;
}
const DateRangeGroup = ({ inputName, text }: InputDateProp) => {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<{ from?: Date; to?: Date }>({});

  const displayLabel =
    range?.from && range?.to
      ? `${format(range.from, "dd/MM")} - ${format(range.to, "dd/MM")}`
      : "Chọn thời gian";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 items-center">
      <Label className="col-span-1 text-md" htmlFor={inputName}>
        {text}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="col-span-2">
          <Button
            className={`inline-flex hover:cursor-pointer items-center justify-between w-full h-12 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white bg-sky-100 border-2 ${
              open ? " border-orange-500" : " border-gray-300"
            }`}
          >
            {displayLabel}
            <CalendarIcon
              className={`ml-2 h-4 w-4 ${open ? "text-orage-500" : ""}`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            modifiers={{
              friday: { dayOfWeek: [5] },
              saturday: { dayOfWeek: [6] },
              sunday: { dayOfWeek: [0] },
            }}
            modifiersStyles={{
              friday: { color: "#660000" },
              saturday: { color: "#660000" },
              sunday: { color: "red" },
            }}
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            disabled={(date) =>
              date < new Date(new Date().setDate(new Date().getDate() - 1))
            } // Vô hiệu hóa các ngày trước ngày hiện tại
            excludeDisabled
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeGroup;
