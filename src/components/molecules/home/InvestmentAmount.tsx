import Text from "@/components/atoms/Text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Repeat } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const InvestmentAmount = () => {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex flex-col h-fit w-[300px] border border-gray-400 rounded-lg p-4 gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Nilai Investasi Awal</Label>
        <Input type="number" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Nilai Investasi Rutin</Label>
        <Input type="number" />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <Repeat className="w-4 h-4" />
          <Text variant={"body400"}>Repeat</Text>
        </div>
        <Select>
          <SelectTrigger className="w-fit border-none">
            <SelectValue placeholder="Repeat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">weekly</SelectItem>
            <SelectItem value="monthly">monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <CalendarIcon className="w-4 h-4" />
          <Text variant={"body400"}>Start</Text>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              className={cn(
                "w-fit justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <CalendarIcon className="w-4 h-4" />
          <Text variant={"body400"}>End</Text>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              className={cn(
                "w-fit justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default InvestmentAmount;
