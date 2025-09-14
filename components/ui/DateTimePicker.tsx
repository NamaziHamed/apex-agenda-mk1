"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateTimePicker({
  onChange,
  onCancel,
  value,
}: {
  value: string;
  onChange: (value: string | null) => void;
  onCancel: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState<string | null>("11:00:00");
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    if (value) {
      const dt = DateTime.fromISO(value);
      setDate(dt.toJSDate());
      setTime(dt.toFormat("HH:mm:ss"));
    }
  }, [value]);

  React.useEffect(() => {
    if (date && time) {
      const luxonDate = DateTime.fromJSDate(date);
      const luxonTime = {
        hour: parseInt(time?.split(":")[0], 10),
        minute: parseInt(time?.split(":")[1], 10),
      };
      const combinedDateTime = luxonDate.set(luxonTime).toUTC();

      onChange(combinedDateTime.toISO());
    }
  }, [date, time, onChange]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date || undefined}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="60"
          value={time || undefined}
          onChange={(e) => setTime(e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
      <div>
        <Button
          type="button"
          variant={"ghost"}
          className="text-xs"
          onClick={() => {
            onChange(null);
            onCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
