'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      updateDateTime(selectedDate, date?.getHours(), date?.getMinutes());
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: number) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        newDate.setHours(value);
      } else if (type === 'minute') {
        newDate.setMinutes(value);
      }
      setDate(newDate);
      updateDateTime(newDate, newDate.getHours(), newDate.getMinutes());
    }
  };

  const updateDateTime = (
    newDate: Date,
    hour: number | undefined,
    minute: number | undefined,
  ) => {
    if (hour !== undefined && minute !== undefined) {
      newDate.setHours(hour);
      newDate.setMinutes(minute);
    }
    onChange(newDate.toISOString());
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, 'MM/dd/yyyy HH:mm')
          ) : (
            <span>MM/DD/YYYY HH:mm</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className='flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex p-2 sm:flex-col'>
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={
                      date && date.getHours() === hour ? 'default' : 'ghost'
                    }
                    className='aspect-square shrink-0 sm:w-full'
                    onClick={() => handleTimeChange('hour', hour)}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex p-2 sm:flex-col'>
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <Button
                    key={minute}
                    size='icon'
                    variant={
                      date && date.getMinutes() === minute ? 'default' : 'ghost'
                    }
                    className='aspect-square shrink-0 sm:w-full'
                    onClick={() => handleTimeChange('minute', minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
