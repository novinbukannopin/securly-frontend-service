import { useGetAdminInsight } from '@/service/queries/insight';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircle,
  Link,
  MousePointerClick,
  Users,
  XCircle,
} from 'lucide-react';

export const InsightCard = () => {
  const { data, error } = useGetAdminInsight();
  console.log(data);

  return (
    <>
      <h1 className='mb-8 text-3xl font-bold text-gray-900'>
        Analytics Dashboard
      </h1>
      <div className='mb-8 grid gap-6 md:grid-cols-3 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Links</CardTitle>
            <Link className='h-4 w-4 text-gray-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data?.totalLinks}</div>
            <p className='text-xs text-gray-500'>Active short links</p>
          </CardContent>
        </Card>

        {/* Total Clicks Card */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Clicks</CardTitle>
            <MousePointerClick className='h-4 w-4 text-gray-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data?.totalClicks}</div>
            <p className='text-xs text-gray-500'>Link clicks tracked</p>
          </CardContent>
        </Card>

        {/* Total Users Card */}
        <Card className={'w-full'}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-gray-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4</div>
            <div className='mt-1 flex items-center space-x-2'>
              <div className='flex items-center text-xs'>
                <CheckCircle className='mr-1 h-3 w-3 text-gray-400' />
                <span className='text-gray-500'>
                  Verified: {data?.userStatistics.verifiedUsers}
                </span>
              </div>
              <div className='flex items-center text-xs'>
                <XCircle className='mr-1 h-3 w-3 text-gray-400' />
                <span className='text-gray-500'>
                  Unverified: {data?.userStatistics.unverifiedUsers}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Clicked Links */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Most Clicked Links</CardTitle>
          <CardDescription>
            Overview of your most popular short links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data?.mostClickedLinks.map((url, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between rounded-lg bg-gray-50 p-4'
              >
                <div className='flex items-center space-x-4'>
                  <div className='rounded-full bg-pink-100 p-2'>
                    {/*<Instagram className='h-5 w-5 text-pink-500' />*/}
                  </div>
                  <div>
                    <p className='font-medium'>{url.originalUrl}</p>
                    <p className='text-sm text-gray-500'>{url.shortCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
