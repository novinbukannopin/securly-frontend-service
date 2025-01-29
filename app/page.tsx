import { BenefitsSection } from '@/components/layout/sections/benefits';
import { CommunitySection } from '@/components/layout/sections/community';
import { ContactSection } from '@/components/layout/sections/contact';
import { FAQSection } from '@/components/layout/sections/faq';
import { FeaturesSection } from '@/components/layout/sections/features';
import { FooterSection } from '@/components/layout/sections/footer';
import { HeroSection } from '@/components/layout/sections/hero';
import { TeamSection } from '@/components/layout/sections/team';
import { TestimonialSection } from '@/components/layout/sections/testimonial';

export const metadata = {
  title: 'Securly - AI Shortener Link',
  description: 'AI Shortener Link for developers',
  openGraph: {
    type: 'website',
    url: 'https://github.com/novinbukannopin/securly-frontend-service',
    title: 'Securly - AI Shortener Link',
    description: 'Free Shadcn landing page for developers',
    images: [
      {
        url: 'https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg',
        width: 1200,
        height: 630,
        alt: 'Securly - AI Shortener Link',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://github.com/nobruf/shadcn-landing-page.git',
    title: 'Securly - AI Shortener Link',
    description: 'Free Shadcn landing page for developers',
    images: [
      'https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg',
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/*<SponsorsSection />*/}
      <BenefitsSection />
      <FeaturesSection />
      {/*<ServicesSection />*/}
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      {/*<PricingSection />*/}
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
