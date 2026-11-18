"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon, XIcon } from "lucide-react";
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
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-between font-normal"
            >
              <span className="flex items-center gap-2">
                <CalendarIcon className="text-muted-foreground" />
                {date ? date.toLocaleDateString() : "Select date"}
              </span>
              <ChevronDownIcon className="text-muted-foreground" />
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
      <div>
        <Input
          type="time"
          aria-label="Time"
          id="time-picker"
          step="60"
          value={time || undefined}
          onChange={(e) => setTime(e.target.value)}
          className="w-28 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
      <div>
        <Button
          type="button"
          variant={"ghost"}
          size="icon"
          aria-label="Remove due date"
          title="Remove due date"
          onClick={() => {
            onChange(null);
            onCancel();
          }}
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
}
