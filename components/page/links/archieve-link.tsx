'use client';

import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useArchivedLink } from '@/service/mutations/archived';

interface ArchiveLinkDialogProps {
  linkId: number;
  isArchived?: boolean;
}

export function ArchiveLinkDialog({
  linkId,
  isArchived,
}: ArchiveLinkDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false); // State dialog utama
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  const method = useArchivedLink();

  const handleArchive = async () => {
    try {
      setIsLoading(true);
      await method.mutateAsync({
        id: linkId,
        action: isArchived ? 'unarchive' : 'archive',
      });
      toast.success('Link archived successfully');
      setDialogOpen(false);
    } catch (error) {
      toast.error('Failed to archive link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          {isArchived ? (
            <DialogTitle>Unarchive Link</DialogTitle>
          ) : (
            <DialogTitle>Archive Link</DialogTitle>
          )}
          <DialogDescription>
            Are you sure you want to archive this link? This action can be
            reversed later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='secondary'
            onClick={() => setDialogOpen(false)} // Tutup dialog secara manual
            disabled={isLoading} // Disable tombol jika sedang loading
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleArchive} // Panggil fungsi handleArchive
            disabled={isLoading} // Disable tombol jika sedang loading
          >
            {isArchived ? 'Unarchive' : 'Archive'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
