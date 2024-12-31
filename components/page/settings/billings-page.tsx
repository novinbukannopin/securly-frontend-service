import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Gauge, Globe, Link, Tags, Users } from 'lucide-react';
import UnderConstruction from '@/components/custom/under-construction';

export default function BillingPage() {
  return (
    <div className='mx-auto max-w-6xl space-y-8 p-6'>
      {/* Header Section */}
      <UnderConstruction />
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-semibold'>Plan and Usage</h1>
          <p className='text-sm text-muted-foreground'>
            You are currently on the{' '}
            <span className='rounded bg-black px-2 py-0.5 text-xs text-white'>
              Free
            </span>{' '}
            plan. Current billing cycle: Dec 30 - Jan 29.
          </p>
        </div>
        <Button variant='outline'>View invoices</Button>
      </div>

      {/* Usage Metrics */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center text-sm font-medium'>
              <Gauge className='mr-2 h-4 w-4' />
              Events tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <Progress value={0} className='mt-2' />
            <p className='mt-2 text-xs text-muted-foreground'>
              1,000 remaining of 1,000
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center text-sm font-medium'>
              <Link className='mr-2 h-4 w-4' />
              Links created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1</div>
            <Progress value={4} className='mt-2' />
            <p className='mt-2 text-xs text-muted-foreground'>
              24 remaining of 25
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Events Tracked Section */}
      <Card>
        <CardContent className='py-6'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='rounded-full bg-muted p-3'>
              <Gauge className='h-6 w-6 text-muted-foreground' />
            </div>
            <h2 className='text-xl font-semibold'>Events Tracked</h2>
            <p className='text-center text-sm text-muted-foreground'>
              No events have been tracked in the current billing cycle.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Globe className='h-5 w-5 text-muted-foreground' />
                <span className='text-sm font-medium'>Custom Domains</span>
              </div>
              <span className='text-sm text-muted-foreground'>0 / 3</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Tags className='h-5 w-5 text-muted-foreground' />
                <span className='text-sm font-medium'>Tags</span>
              </div>
              <span className='text-sm text-muted-foreground'>1 / 5</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Users className='h-5 w-5 text-muted-foreground' />
                <span className='text-sm font-medium'>Teammates</span>
              </div>
              <span className='text-sm text-muted-foreground'>1 / 1</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Banner */}
      <div className='flex items-center justify-between rounded-lg border p-4'>
        <p className='text-sm text-muted-foreground'>
          For higher limits, upgrade to the Pro plan.
        </p>
        <Button>Upgrade to Pro</Button>
      </div>

      {/* Payment Methods */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-xl font-semibold'>Payment methods</h2>
            <p className='text-sm text-muted-foreground'>
              Manage your payment methods on Dub
            </p>
          </div>
        </div>
        <Card>
          <CardContent className='py-6'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className='rounded-full bg-muted p-3'>
                <CreditCard className='h-6 w-6 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-semibold'>
                No payment methods found
              </h3>
              <p className='text-center text-sm text-muted-foreground'>
                You haven&apost added any payment methods yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
