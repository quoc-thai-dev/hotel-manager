import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import InputDateGroup from '../InputDateGroup'
import InputGroup from '../InputGroup'
import Title from '../Title'
import { Calendar, CalendarDayButton } from '../ui/calendar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select } from '../ui/select'
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import React from 'react'
const priceMap: Record<string, string> = {
    // Chèn vào đây dữ liệu giá cho từng ngày theo định dạng ISO: "YYYY-MM-DD": "₫xxx"
    // Ví dụ:
    "2025-08-20": "₫500k",
    // ...
};
const SelectRoom = () => {
    const [selectedDates, setSelectedDates] = React.useState<Date[] | undefined>(undefined);


    const handleSelect: Parameters<typeof Calendar>["0"]["onSelect"] = (dates, clickedDate, modifiers, e) => {
        // dates có thể là undefined hoặc Date[]
        console.log(dates)
        setSelectedDates(dates);
    };
    return (
        <>
            <hr className='my-5' />
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-center'>
                <div className='flex flex-col gap-2'>
                    <Label>Chọn hạng phòng</Label>
                    <Select>
                        <SelectTrigger className="w-full bg-sky-100 border-2 border-gray-300 focus:border-orange-500">
                            <SelectValue placeholder="Chọn phòng" />
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
                <div className='flex flex-col gap-2'>
                    <Label>Số phòng</Label>
                    <Input type='text' name='room' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Số đêm</Label>
                    <Input type='text' name='night' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="date-picker" className="px-1 col-span-1">
                        Chọn ngày
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" id="date-picker" className="w-full bg-sky-100 justify-between font-normal">
                                {selectedDates && selectedDates.length > 0
                                    ? selectedDates.map((d) => d.getDate()).join(", ")
                                    : "Chọn ngày"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="multiple"
                                selected={selectedDates}
                                onSelect={handleSelect}
                                modifiers={{
                                    sunday: { dayOfWeek: [0] },
                                }}
                                modifiersStyles={{
                                    sunday: { color: 'red' },
                                }}
                            />
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
        </>
    )
}

export default SelectRoom