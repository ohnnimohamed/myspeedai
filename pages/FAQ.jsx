import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const faqs = [
  {
    question: "What is a good internet speed?",
    answer: "A 'good' internet speed is relative to your needs. For basic browsing and email, 10-25 Mbps is sufficient. For streaming HD video on one device, around 25 Mbps is recommended. If your household has multiple users who stream 4K video, participate in online gaming, and work from home, you should aim for speeds of 100 Mbps or higher."
  },
  {
    question: "Why is my internet so slow?",
    answer: "There are many potential reasons for slow internet. Common causes include: router position (it should be in a central, open area), network congestion (too many devices connected), outdated router firmware, interference from other electronics, or you might simply need a better plan from your Internet Service Provider (ISP)."
  },
  {
    question: "How can I test my internet speed accurately?",
    answer: "For the most accurate results, follow these steps: 1. Connect your computer directly to the router using an Ethernet cable. 2. Close all other applications, browser tabs, and streaming services. 3. Ensure no one else in your home is using the internet heavily. 4. Run the test a few times at different times of the day to get an average."
  },
  {
    question: "What is ping and why does it matter for gaming?",
    answer: "Ping (or latency) is the reaction time of your connection—how quickly your device gets a response after you've sent out a request. It's measured in milliseconds (ms). For online gaming, a low ping is crucial for a smooth experience, as it reduces lag between your actions and the game's response. A ping below 40ms is considered excellent for gaming."
  },
  {
    question: "What is the difference between Mbps and MBps?",
    answer: "Mbps stands for Megabits per second, while MBps stands for Megabytes per second. There are 8 bits in 1 byte, so a 100 Mbps connection will download a file at a maximum of 12.5 MBps. Internet speeds are almost always advertised in Mbps, while file sizes are shown in MBps."
  },
  {
    question: "What do download and upload speed mean?",
    answer: "Download speed refers to how quickly data is pulled from the internet to your device. This is important for activities like streaming movies, loading websites, and downloading files. Upload speed is how quickly data is sent from your device to the internet, which is critical for video calls, online gaming, and sending large files."
  }
];

const FAQ = () => {
  const { t } = useLocalization();

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">{t('faq.title')}</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group border-b border-gray-200 dark:border-gray-700 pb-4">
            <summary className="flex justify-between items-center font-semibold cursor-pointer text-lg text-text-light dark:text-text-dark list-none">
              {faq.question}
              <span className="transition-transform transform group-open:rotate-180">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </summary>
            <p className="mt-2 text-text-muted-light dark:text-text-muted-dark leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;