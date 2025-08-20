import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { getDefaultClassNames } from "react-day-picker";
interface InputDateProp {
  inputName: string;
  text: string;
  hidden?: Boolean
}
const priceMap: Record<string, string> = {
  // Chèn vào đây dữ liệu giá cho từng ngày theo định dạng ISO: "YYYY-MM-DD": "₫xxx"
  // Ví dụ:
  "2025-08-20": "₫500k",
  // ...
};
function InputDateGroup({ inputName, text, hidden }: InputDateProp) {
  const defaultClassNames = getDefaultClassNames();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 items-center ${hidden ? "hidden" : ""}`}>
      <Label className="col-span-1 text-md" htmlFor={inputName}>
        {text}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="col-span-2">
          <Button
            variant="outline"
            id="date"
            className={`w-full hover:cursor-pointer h-12 justify-between bg-sky-100 font-700 border-2 ${open ? " border-orange-500" : " border-gray-300"
              }`}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <CalendarIcon className={`${open ? "text-orange-500" : ""}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            modifiers={{ sunday: { dayOfWeek: [0] } }}
            modifiersStyles={{
              sunday: { color: '#ffffff', backgroundColor: 'pink' }
            }}
            classNames={{
              day: cn("group w-[48px] h-[48px]", defaultClassNames.day)
            }}
            animate
            // disabled={{before:new Date()}}
            components={{
              DayButton: ({ day, children, modifiers, ...props }) => {
                const iso = day.date.toISOString().split("T")[0];
                const price = priceMap[iso] || "₫0"; // nhãn mặc định nếu không có giá dữ liệu

                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    <div className="flex flex-col items-center">
                      {children}
                      <span className="mt-1 text-xs text-blue-700">{price}</span>
                    </div>
                  </CalendarDayButton>
                );
              }
            }}
            mode="single"
            showOutsideDays
            today={new Date()}
            selected={date ?? new Date()}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default InputDateGroup;
