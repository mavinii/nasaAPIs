import { useEffect, useState } from 'react';
import ContentBanner from './compoments/ContentBanner';
import logoImage from '/Bounce_Insights_Logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import ContentFooter from './compoments/ContentFooter';

interface ApodData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
}

export function App() {
  const [banner, setBanner] = useState<ApodData[]>([]);
  
  // NASA's Astronomy Picture of the Day (APOD) API
  useEffect(() => {
    async function fetchAPIDataApod() {
      try {
        const response = await fetch('http://localhost:3001/nasa-apod');
        const apiData = await response.json();
        setBanner([apiData]);
        console.log('API Data:', apiData);
      } catch (error) {
        console.error('Error fetching from backend:', error);
      }
     }
    fetchAPIDataApod();
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center justify-center'>

      {/* Logo, Title and Subtitle */}
      <div className='flex flex-col items-center gap-3'>
        <img src={logoImage} alt="Bounce Insights" className='w-72 mt-32' />
        <h1 className='text-white text-4xl'>Software Engineer Challenge</h1>
        <p className="text-zinc-300 text-base">Web App that consumes NASA's APIs to display data by Marcos Oliveira.</p>
      </div>

      {/* Content Box */}
      <div className='grid grid-cols-3 gap-6 mt-16'>

        <Dialog.Root>
          {banner.map(banner => {
            const shortenedDescription = banner.explanation.split(' ').slice(0, 15).join(' ') + '...';

            return (
              <div key={banner.date}>
                <ContentBanner
                  bannerUrl={banner.media_type === 'image' ? banner.url : banner.hdurl}
                  date={banner.date}
                  title={banner.title}
                  description={shortenedDescription}
                />
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/60 fixed inset-0" />
                  <Dialog.Content className="fixed bg-[#262634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
                    <Dialog.Title className="text-2xl">
                      {banner.title}
                    </Dialog.Title>
                    <Dialog.Description className='pt-4'>
                      {banner.explanation}
                    </Dialog.Description>
                  </Dialog.Content>
                </Dialog.Portal>
              </div>
            );
          })}
        </Dialog.Root>

      </div>

      {/* About this project */}
      <ContentFooter />

    </div>
  )
}