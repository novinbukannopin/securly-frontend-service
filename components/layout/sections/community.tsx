import DiscordIcon from '@/components/icons/discord-icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const CommunitySection = () => {
  return (
    <section id='community' className='py-12'>
      <hr className='border-secondary' />
      <div className='container py-20 sm:py-20'>
        <div className='mx-auto lg:w-[60%]'>
          <Card className='flex flex-col items-center justify-center border-none bg-background text-center shadow-none'>
            <CardHeader>
              <CardTitle className='flex flex-col items-center text-4xl font-bold md:text-5xl'>
                <DiscordIcon />
                <div>
                  Ready to join this
                  <span className='bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text pl-2 text-transparent'>
                    Movement?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='text-xl text-muted-foreground lg:w-[80%]'>
              Join our vibrant community of innovators and tech enthusiasts!
              Share your ideas, contribute to the future of secure URL
              shortening, or simply connect with like-minded individuals. Your
              insights could shape the next breakthrough. Click to join us and
              be part of something incredible! 🚀
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href='https://github.com/novinbukannopin' target='_blank'>
                  Join the Community 😍
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className='border-secondary' />
    </section>
  );
};
