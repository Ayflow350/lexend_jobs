// components/ui/CountryCombobox.tsx (or wherever you placed it)
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { countryList } from "@/lib/form-utils"; // Adjust path if needed

// === THE FIX IS HERE ===
interface CountryComboboxProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string; // Add the optional className prop to the interface
}

export function CountryCombobox({
  value,
  onValueChange,
  placeholder = "Select country...",
  className, // <-- Receive the className prop
}: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCountry = React.useMemo(
    () => countryList.find((country) => country.code === value),
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // Apply the className to the button so it can be styled from the outside
          className={cn("w-full justify-between font-normal", className)}
        >
          {selectedCountry ? (
            <div className="flex items-center">
              <span className="mr-2">{selectedCountry.flagEmoji}</span>
              {selectedCountry.name}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-[300px] overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryList.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={(currentValue) => {
                    const newlySelectedCountry = countryList.find(
                      (c) => c.name.toLowerCase() === currentValue.toLowerCase()
                    );
                    if (newlySelectedCountry) {
                      onValueChange(
                        newlySelectedCountry.code === value
                          ? ""
                          : newlySelectedCountry.code
                      );
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="mr-2">{country.flagEmoji}</span>
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
