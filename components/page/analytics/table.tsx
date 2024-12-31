'use client';

import { FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AnalyticsResponse } from '@/types/analytics';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { useState } from 'react';

export function TableAnalytics({
  topClick,
  onRowClick,
}: {
  topClick: AnalyticsResponse['topLinks'];
  onRowClick: (code: string) => void;
}) {
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const handleClick = (code: string) => {
    setActiveRow((prev) => (prev === code ? null : code)); // Toggle aktif atau tidak
    onRowClick(code === activeRow ? '' : code); // Kirimkan nilai '' jika tidak aktif
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead className='text-right'>Clicks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topClick.map((item, id) => {
            const isActive = activeRow === item.shortCode;

            return (
              <TooltipProvider key={id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TableRow
                      className={`cursor-pointer ${
                        isActive
                          ? 'bg-primary/10' // Warna untuk baris aktif
                          : 'hover:bg-muted/50' // Warna untuk baris yang tidak aktif
                      }`}
                      onClick={() => handleClick(item.shortCode)}
                    >
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <FileText className='h-4 w-4 text-muted-foreground' />
                          secur.ly/{item.shortCode}
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        {item.clicks}
                      </TableCell>
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent side={'left'} className={'cursor-pointer'}>
                    <TooltipArrow />
                    <p>{item.originalUrl}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
