import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {ko} from "date-fns/locale";

interface Props {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}


export default function CalendarWithTimePicker({date, onSelect}: Props) {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'h' | 'm' | 's') => {
    const value = event.target.value;
    const parsedValue = parseInt(value) || 0;
    if(type === 'h'){
      if(parsedValue >= 24) return;
      const hourDate = date ? new Date(date) : new Date();
      hourDate.setHours(parsedValue);
      onSelect(hourDate);
    }
    else if(type === 'm'){
      if(parsedValue >= 60) return;
      const minuteDate = date ? new Date(date) : new Date();
      minuteDate.setMinutes(parsedValue);
      onSelect(minuteDate);
    }
    else if(type === 's'){
      if(parsedValue >= 60) return;
      const secondDate = date ? new Date(date) : new Date();
      secondDate.setSeconds(parsedValue);
      onSelect(secondDate);
    }

  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss", {locale: ko}) : <span>날짜를 선택해 주세요</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? date : undefined}
          onSelect={onSelect}
          initialFocus
        />
        <div className="flex justify-between mb-2">
          <div className="grid gap-1 text-center ml-2 w-16">
            <Label htmlFor="seconds" className="text-xs">
              Hours
            </Label>
            <Input
              name="startTime" placeholder="시"
              value={date ? date.getHours() : undefined}
              onChange={(e) => {
                handleTimeChange(e, 'h');
              }}
              className="col-span-3 w-[48px]"
            />
          </div>
          <div className="grid gap-1 text-center w-16">
            <Label htmlFor="seconds" className="text-xs">
              Minutes
            </Label>
            <Input
              name="startTime" placeholder="분"
              value={date ? date.getMinutes() : undefined}
              onChange={(e) => {
                handleTimeChange(e, 'm');
              }}
              className="col-span-3 w-[48px]"
            />
          </div>
          <div className="grid gap-1 text-center w-16">
            <Label htmlFor="seconds" className="text-xs">
              Seconds
            </Label>
            <Input
              name="startTime" placeholder="초"
              value={date ? date.getSeconds() : undefined}
              onChange={event => {
                handleTimeChange(event, 's');
              }}
              className="col-span-3 w-[48px]"
            />
          </div>
          <div className="flex-1" />
        </div>
      </PopoverContent>
    </Popover>
  );
}