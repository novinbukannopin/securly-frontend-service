import { JSX, SVGProps } from 'react';

export default function UnderConstruction() {
  return (
    <div className='flex h-auto flex-col items-center justify-center bg-background text-center'>
      <div className='inline-flex items-center gap-4 text-6xl'>
        <ConstructionIcon className='h-16 w-16' />
        <span>Under Construction</span>
      </div>
      <p className='mt-4 max-w-md text-muted-foreground'>
        This page is currently being worked on and will be available soon.
        Please check back later.
      </p>
    </div>
  );
}

function ConstructionIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='2' y='6' width='20' height='8' rx='1' />
      <path d='M17 14v7' />
      <path d='M7 14v7' />
      <path d='M17 3v3' />
      <path d='M7 3v3' />
      <path d='M10 14 2.3 6.3' />
      <path d='m14 6 7.7 7.7' />
      <path d='m8 6 8 8' />
    </svg>
  );
}
