import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { icons } from 'lucide-react';

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'Blocks',
    title: 'Protect Users from Harmful Links',
    description:
      'Ensure every link you share is free from malware, spam, or malicious content. Our advanced security checks safeguard your audience and your brand.',
  },
  {
    icon: 'LineChart',
    title: 'In-Depth Link Analytics',
    description:
      'Understand your audience better with detailed analytics. Track clicks, locations, devices, and engagement in real-time to optimize your campaigns.',
  },
  {
    icon: 'Wallet',
    title: 'Custom Short URLs',
    description:
      'Make every link your own. Create branded short URLs that build trust and improve click-through rates while reinforcing your identity.',
  },
  {
    icon: 'Sparkle',
    title: 'Dynamic QR Code Generator',
    description:
      'Generate and customize QR codes that match your brand. Securely share links in the offline world and track their performance with ease.',
  },
];

export const BenefitsSection = () => {
  return (
    <section id='benefits' className='container py-24 sm:py-32'>
      <div className='grid place-items-center lg:grid-cols-2 lg:gap-24'>
        <div>
          <h2 className='mb-2 text-lg tracking-wider text-primary'>Benefits</h2>

          <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
            Your Shortcut to Secure & Smarter Links
          </h2>
          <p className='mb-8 text-xl text-muted-foreground'>
            Protect your brand, increase trust, and gain valuable insights with
            every link you share. Securly empowers you to stay ahead with
            unmatched security and analytics.
          </p>
        </div>

        <div className='grid w-full gap-4 lg:grid-cols-2'>
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className='group/number bg-muted/50 transition-all delay-75 hover:bg-background dark:bg-card'
            >
              <CardHeader>
                <div className='flex justify-between'>
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color='hsl(var(--primary))'
                    className='mb-6 text-primary'
                  />
                  <span className='text-5xl font-medium text-muted-foreground/15 transition-all delay-75 group-hover/number:text-muted-foreground/30'>
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className='text-muted-foreground'>
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
