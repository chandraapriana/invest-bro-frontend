"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Repeat } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface InvestmentAmountProps {
  onChangeRepeatType: (type: string) => void;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
}

export default function InvestmentAmount(props: InvestmentAmountProps) {
  const [startDate, setStartDate] = useState<Value>(null);
  const [endDate, setEndDate] = useState<Value>(null);
  const [repeatFrequency, setRepeatFrequency] = useState("weekly");

  const formatDate = (date: Value) => {
    if (date instanceof Date) {
      return format(date, "yyyy-MM-dd"); // Format date to YYYY-MM-DD
    }
    return "Select Date";
  };

  const handleStartDateChange = (date: Value) => {
    setStartDate(date);
    if (date instanceof Date) {
      props.onChangeStartDate(format(date, "yyyy-MM-dd")); // Pass formatted date
    }
  };

  const handleEndDateChange = (date: Value) => {
    setEndDate(date);
    if (date instanceof Date) {
      props.onChangeEndDate(format(date, "yyyy-MM-dd")); // Pass formatted date
    }
  };

  const handleRepeatChange = (type: string) => {
    setRepeatFrequency(type);
    props.onChangeRepeatType(type); // Pass repeat type
  };

  return (
    <Card className="w-[350px] shadow-md rounded-lg border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Periode Investasi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Repeat className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Repeat
            </span>
          </div>
          <Select value={repeatFrequency} onValueChange={handleRepeatChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Start Date
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-fit justify-start text-left font-normal border-gray-300 hover:bg-gray-100",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(startDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border border-gray-200 rounded-lg shadow-lg">
              <Calendar
                onChange={handleStartDateChange}
                value={startDate}
                maxDetail="year"
                minDetail="decade"
                view="month"
                defaultView="month"
                maxDate={new Date()}
                className="p-2 rounded-lg bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2 flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              End Date
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-fit justify-start text-left font-normal border-gray-300 hover:bg-gray-100",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(endDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border border-gray-200 rounded-lg shadow-lg">
              <Calendar
                onChange={handleEndDateChange}
                value={endDate}
                maxDetail="year"
                minDetail="decade"
                view="year"
                maxDate={new Date()}
                className="p-2 rounded-lg bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
