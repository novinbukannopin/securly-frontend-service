import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'What is Securly?',
    answer:
      'Securly is a URL shortener that ensures secure and reliable link management with advanced malware detection and analytics.',
    value: 'item-1',
  },
  {
    question: 'Is Securly free to use?',
    answer:
      'Yes, Securly offers a free plan with basic features. Premium plans with advanced features are also available.',
    value: 'item-2',
  },
  {
    question: 'How does Securly check for malicious links?',
    answer:
      'Securly uses AI-powered deep learning algorithms to scan links for malware, phishing, and other malicious content.',
    value: 'item-3',
  },
  {
    question: 'Can I customize my short URLs?',
    answer:
      'Yes, you can customize your short URLs to better align with your brand or campaign needs.',
    value: 'item-4',
  },
  {
    question: 'What analytics does Securly provide?',
    answer:
      'Securly provides detailed analytics such as click counts, geographical locations, and device types of visitors.',
    value: 'item-5',
  },
  {
    question: 'Can I set an expiration date for my short URLs?',
    answer:
      'Yes, Securly allows you to set an expiration date for your short URLs, making them inaccessible after a specific time.',
    value: 'item-6',
  },
  {
    question: 'How do I create a custom QR code?',
    answer:
      'You can generate custom QR codes for your links directly from the Securly dashboard.',
    value: 'item-7',
  },
  {
    question: 'Is my data safe with Securly?',
    answer:
      'Yes, Securly prioritizes data security and uses encryption to ensure your data remains private and secure.',
    value: 'item-8',
  },
  {
    question: 'Do I need an account to use Securly?',
    answer:
      'No account is needed for basic link shortening, but advanced features like analytics and customization require an account.',
    value: 'item-9',
  },
  {
    question: 'How can I get support if I face issues?',
    answer:
      "You can contact our support team through the 'Contact Us' page, or join our community on Discord for quick help.",
    value: 'item-10',
  },
];

export const FAQSection = () => {
  return (
    <section id='faq' className='container py-24 sm:py-32 md:w-[700px]'>
      <div className='mb-8 text-center'>
        <h2 className='mb-2 text-center text-lg tracking-wider text-primary'>
          FAQS
        </h2>

        <h2 className='text-center text-3xl font-bold md:text-4xl'>
          Common Questions
        </h2>
      </div>

      <Accordion type='single' collapsible className='AccordionRoot'>
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className='text-left'>
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
