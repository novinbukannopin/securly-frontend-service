import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: 'Free',
    popular: 0,
    price: 0,
    description: 'Ideal for personal use and small projects.',
    buttonText: 'Start Free',
    benefitList: [
      'Unlimited short links',
      'Basic URL safety checks',
      'Basic analytics (click count)',
      'Community support',
    ],
  },
  {
    title: 'Pro',
    popular: 1,
    price: 20,
    description: 'Perfect for freelancers and growing businesses.',
    buttonText: 'Get Started',
    benefitList: [
      'Custom branded short links',
      'Advanced URL safety checks (AI-based)',
      'Detailed analytics (geolocation, device)',
      'Custom QR codes',
      'Priority email support',
    ],
  },
  {
    title: 'Enterprise',
    popular: 0,
    price: 99,
    description: 'Tailored for large teams and organizations.',
    buttonText: 'Contact Us',
    benefitList: [
      'Unlimited branded short links',
      'AI-driven malicious URL detection',
      'Team collaboration (10 members included)',
      'Advanced analytics dashboard',
      'Custom integrations (API access)',
      'Dedicated account manager',
      'Phone & email support',
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className='container py-24 sm:py-32'>
      <h2 className='mb-2 text-center text-lg tracking-wider text-primary'>
        Pricing
      </h2>

      <h2 className='mb-4 text-center text-3xl font-bold md:text-4xl'>
        Choose the Perfect Plan
      </h2>

      <h3 className='mx-auto pb-14 text-center text-xl text-muted-foreground md:w-1/2'>
        Access powerful tools for secure URL shortening, analytics, and more.
        Pick the plan that suits your needs.
      </h3>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? 'border-[1.5px] border-primary shadow-black/10 drop-shadow-xl dark:shadow-white/10 lg:scale-[1.1]'
                  : ''
              }
            >
              <CardHeader>
                <CardTitle className='pb-2'>{title}</CardTitle>

                <CardDescription className='pb-4'>
                  {description}
                </CardDescription>

                <div>
                  <span className='text-3xl font-bold'>${price}</span>
                  <span className='text-muted-foreground'> /month</span>
                </div>
              </CardHeader>

              <CardContent className='flex'>
                <div className='space-y-4'>
                  {benefitList.map((benefit) => (
                    <span key={benefit} className='flex'>
                      <Check className='mr-2 text-primary' />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? 'default' : 'secondary'
                  }
                  className='w-full'
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  );
};
