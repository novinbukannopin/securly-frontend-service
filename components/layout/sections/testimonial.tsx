'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: 'https://github.com/shadcn.png',
    name: 'Budi Santoso',
    userName: 'IT Manager, Gojek',
    comment:
      'Securly telah menjadi solusi utama kami untuk memendekkan dan mengamankan URL dengan teknologi deep learning. Sangat membantu dalam menjaga keamanan link yang kami bagikan kepada mitra dan pengguna kami.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Rina Kusuma',
    userName: 'DevOps Engineer, Tokopedia',
    comment:
      'Dengan Securly, kami dapat membuat QR code custom dan memantau performa link melalui analytics yang lengkap. Alat ini sangat bermanfaat untuk kampanye pemasaran kami.',
    rating: 4.9,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Andi Pratama',
    userName: 'Cybersecurity Analyst, Shopee',
    comment:
      'Fitur deteksi malware berbasis deep learning di Securly sangat mengesankan. Kami tidak lagi khawatir tentang link yang berpotensi berbahaya karena semuanya dicek secara otomatis.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Siti Lestari',
    userName: 'Data Scientist, Bukalapak',
    comment:
      'Analytics yang disediakan Securly sangat membantu tim kami untuk memahami perilaku pengguna. Fitur custom short URL juga memberikan sentuhan profesional untuk brand kami.',
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Agus Hidayat',
    userName: 'Software Engineer, Grab',
    comment:
      'Securly telah meningkatkan efisiensi kami dalam berbagi link dan melacak performa kampanye. Fitur setting expired link sangat berguna untuk menjaga keamanan link yang sudah tidak relevan.',
    rating: 4.9,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Nina Maharani',
    userName: 'IT Project Manager, Blibli',
    comment:
      'Integrasi fitur branding dan keamanan dari Securly memberikan kami kepercayaan diri dalam berbagi link ke mitra dan pengguna kami. Alat ini sangat fleksibel dan mudah digunakan.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Rizky Kurniawan',
    userName: 'Product Manager, OVO',
    comment:
      'Fitur custom short URL dan QR code di Securly sangat memudahkan tim kami dalam menciptakan pengalaman pengguna yang profesional.',
    rating: 4.7,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Ayu Setiawati',
    userName: 'Software Engineer, Dana',
    comment:
      'Securly memberikan solusi keamanan link yang sangat baik. Kami sangat terbantu dengan deteksi malware otomatis yang disediakan.',
    rating: 4.9,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Galih Ramadhan',
    userName: 'Senior Backend Engineer, Kredivo',
    comment:
      'Analytics yang terintegrasi di Securly membantu kami memonitor performa link dengan sangat mudah dan mendalam.',
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Intan Wulandari',
    userName: 'Security Analyst, LinkAja',
    comment:
      'Dengan Securly, kami dapat meminimalisir risiko keamanan dengan deteksi URL berbahaya yang cepat dan akurat.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Yoga Mahendra',
    userName: 'Infrastructure Engineer, Traveloka',
    comment:
      'Fitur expired link sangat membantu kami menjaga link yang kami bagikan tetap aman dan relevan.',
    rating: 4.9,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Ratna Oktavia',
    userName: 'Fullstack Developer, Zenius',
    comment:
      'Securly membantu kami menciptakan QR code yang sesuai dengan brand kami dan memastikan keamanannya dengan mudah.',
    rating: 4.7,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Dewi Amalia',
    userName: 'Data Analyst, Ruangguru',
    comment:
      'Integrasi Securly dengan platform kami memberikan fleksibilitas dan keamanan dalam berbagi link ke pengguna.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Hendra Wijaya',
    userName: 'IT Support Specialist, Modalku',
    comment:
      'Solusi URL shortening yang diberikan oleh Securly sangat sederhana dan efektif untuk kebutuhan sehari-hari kami.',
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Citra Handayani',
    userName: 'UX Designer, Halodoc',
    comment:
      'Securly memberikan kebebasan dalam kustomisasi link dan QR code, yang sangat membantu dalam meningkatkan pengalaman pengguna kami.',
    rating: 4.9,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Rama Pratomo',
    userName: 'Mobile Developer, Kopi Kenangan',
    comment:
      'Fitur analytics di Securly sangat lengkap dan membantu kami memahami pengguna kami dengan lebih baik.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Linda Paramitha',
    userName: 'Backend Developer, HappyFresh',
    comment:
      'Deteksi URL berbahaya secara otomatis adalah fitur yang paling kami butuhkan, dan Securly memberikan ini dengan sempurna.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Bayu Saputra',
    userName: 'Frontend Developer, Sayurbox',
    comment:
      'Proses kustomisasi URL dan QR code di Securly sangat mudah dan sesuai dengan kebutuhan kami.',
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Fajar Santoso',
    userName: 'System Administrator, Ajaib',
    comment:
      'Fitur expired link dari Securly sangat membantu kami dalam mengelola link dengan aman.',
    rating: 4.7,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Yulia Anggraini',
    userName: 'Security Engineer, Bibit',
    comment:
      'Securly adalah solusi yang sangat lengkap untuk keamanan link dan pengelolaan URL di perusahaan kami.',
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  return (
    <section id='testimonials' className='container py-24 sm:py-32'>
      <div className='mb-8 text-center'>
        <h2 className='mb-2 text-center text-lg tracking-wider text-primary'>
          Testimonials
        </h2>

        <h2 className='mb-4 text-center text-3xl font-bold md:text-4xl'>
          Hear What Our 1000+ Clients Say
        </h2>
      </div>

      <Carousel
        opts={{
          align: 'start',
        }}
        className='relative mx-auto w-[80%] sm:w-[90%] lg:max-w-screen-xl'
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className='md:basis-1/2 lg:basis-1/3'
            >
              <Card className='bg-muted/50 dark:bg-card'>
                <CardContent className='pb-0 pt-6'>
                  <div className='flex gap-1 pb-6'>
                    <Star className='size-4 fill-primary text-primary' />
                    <Star className='size-4 fill-primary text-primary' />
                    <Star className='size-4 fill-primary text-primary' />
                    <Star className='size-4 fill-primary text-primary' />
                    <Star className='size-4 fill-primary text-primary' />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className='flex flex-row items-center gap-4'>
                    <Avatar>
                      <AvatarImage
                        src='https://avatars.githubusercontent.com/u/75042455?v=4'
                        alt='radix'
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col'>
                      <CardTitle className='text-lg'>{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
