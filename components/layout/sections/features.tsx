import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { icons } from 'lucide-react';

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: 'TabletSmartphone',
    title: 'Shorten URLs in Seconds',
    description:
      'Effortlessly create clean, professional short links that are easy to share and remember.',
  },
  {
    icon: 'BadgeCheck',
    title: 'AI-Powered URL Security',
    description:
      'Automatically check original links for malware, spam, and malicious content using advanced deep learning technology.',
  },
  {
    icon: 'Goal',
    title: 'Custom Short URLs',
    description:
      'Take control of your branding with personalized short links that resonate with your audience.',
  },
  {
    icon: 'PictureInPicture',
    title: 'Visitor and Click Analytics',
    description:
      'Gain valuable insights with detailed reports on link clicks, locations, devices, and user behavior.',
  },
  {
    icon: 'MousePointerClick',
    title: 'Custom QR Code Generator',
    description:
      'Design QR codes that match your brand style and track their performance in real time.',
  },
  {
    icon: 'Newspaper',
    title: 'Set Expiry for Links',
    description:
      'Easily manage link lifespans with expiration settings, ensuring your links remain relevant and secure.',
  },
];

export const FeaturesSection = () => {
  return (
    <section id='features' className='container py-24 sm:py-32'>
      <h2 className='mb-2 text-center text-lg tracking-wider text-primary'>
        Features
      </h2>

      <h2 className='mb-4 text-center text-3xl font-bold md:text-4xl'>
        What Makes Us Different
      </h2>

      <h3 className='mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2'>
        Shorten, secure, and customize your links with cutting-edge features
        designed to protect your audience and boost your brand’s performance.
        Here’s what sets Securly apart:
      </h3>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className='h-full border-0 bg-background shadow-none'>
              <CardHeader className='flex items-center justify-center'>
                <div className='mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10'>
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color='hsl(var(--primary))'
                    className='text-primary'
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className='text-center text-muted-foreground'>
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
