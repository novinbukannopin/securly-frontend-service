'use client';

import { Marquee } from '@devnomic/marquee';
import '@devnomic/marquee/dist/index.css';
import Image from 'next/image';

interface SponsorProps {
  image: string;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    image: 'adobe.svg',
    name: 'Adobe',
  },
  {
    image: 'airbnb.svg',
    name: 'Airbnb',
  },
  {
    image: 'amazon.svg',
    name: 'amazon',
  },
  {
    image: 'atlasian.svg',
    name: 'attlasian',
  },
  {
    image: 'docker.svg',
    name: 'docker',
  },
  {
    image: 'framer.svg',
    name: 'framer',
  },
  {
    image: 'google.svg',
    name: 'google',
  },
  {
    image: 'microsoft.svg',
    name: 'microsoft',
  },
  {
    image: 'netflix.svg',
    name: 'netflix',
  },
  {
    image: 'paypal.svg',
    name: 'paypal',
  },
  {
    image: 'spacex.svg',
    name: 'spacex',
  },
  {
    image: 'tesla.svg',
    name: 'tesla',
  },
];

export const SponsorsSection = () => {
  return (
    <section id='sponsors' className='mx-auto max-w-[75%] pb-24 sm:pb-32'>
      <h2 className='mb-6 text-center text-lg md:text-xl'>
        Our Platinum Sponsors
      </h2>

      <div className='mx-auto'>
        <Marquee
          className='gap-[3rem]'
          fade
          innerClassName='gap-[3rem]'
          pauseOnHover
        >
          {sponsors.map(({ image, name }) => (
            <div key={name} className='flex items-center justify-center'>
              <Image
                src={'/sponsors/' + image}
                alt={name}
                className='h-12 w-auto object-contain'
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
