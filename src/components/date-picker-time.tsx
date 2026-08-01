"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localInputToUtc, utcToLocalInput } from "@/lib/calendar-utils";

type DatePickerTimeProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePickerTime({ value, onChange }: DatePickerTimeProps) {
  {
    const [open, setOpen] = React.useState(false);
    const date = value ? new Date(utcToLocalInput(value)) : undefined;
    const time = date
      ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
      : "";

    return (
      <FieldGroup className="mx-auto max-w-xs flex-row">
        <Field>
          <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-32 justify-between font-normal"
                >
                  {date ? format(date, "PPP") : "Select date"}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              }
            />
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(selectedDate) => {
                  if (!selectedDate) return;

                  const currentDate = date;
                  const next = currentDate ? new Date(currentDate) : new Date();

                  next.setFullYear(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                  );

                  onChange(localInputToUtc(next));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field className="w-32">
          <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
          <Input
            type="time"
            value={time}
            onChange={(e) => {
              const currentDate = date;
              if (!currentDate) return;

              const [hours, minutes] = e.target.value.split(":").map(Number);

              const next = new Date(currentDate);
              next.setHours(hours, minutes, 0, 0);

              onChange(localInputToUtc(next));
            }}
          />
        </Field>
      </FieldGroup>
    );
  }
}
