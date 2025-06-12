"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import phoneCodes from "../../data/country-phone-codes.json";

interface CountryCodeComboboxProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export function CountryCodeCombobox({
  value,
  onValueChange,
}: CountryCodeComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCode = React.useMemo(
    () => phoneCodes.find((c) => c.dial_code === value),
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className="flex items-center justify-between w-auto min-w-[110px] h-full cursor-pointer px-3"
        >
          {selectedCode ? (
            <div className="flex items-center gap-2">
              <span>{selectedCode.flag}</span>
              {/* === THE FIX IS HERE === */}
              {/* This container stacks the text vertically */}
              <div className="flex flex-col items-start leading-tight">
                {selectedCode.dial_code.includes("-") ? (
                  <>
                    {/* Render the part before the hyphen */}
                    <span>{selectedCode.dial_code.split("-")[0]}-</span>
                    {/* Render the part after the hyphen on a new "line" */}
                    <span>{selectedCode.dial_code.split("-")[1]}</span>
                  </>
                ) : (
                  // If no hyphen, just render the code normally
                  <span>{selectedCode.dial_code}</span>
                )}
              </div>
            </div>
          ) : (
            "Code"
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 max-h-[300px] overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {phoneCodes.map((c) => (
                <CommandItem
                  key={c.code}
                  value={c.name}
                  onSelect={() => {
                    onValueChange(c.dial_code === value ? "" : c.dial_code);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === c.dial_code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-3 w-full">
                    <span>{c.flag}</span>
                    <span className="flex-grow">{c.name}</span>
                    <span className="text-muted-foreground">{c.dial_code}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
