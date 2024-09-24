import { useEffect, useState } from 'react';
import logoImage from '/Bounce_Insights_Logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import ContentFooter from './compoments/ContentFooter';
import MarsBanners from './compoments/MarsBanner';
import ApodBanner from './compoments/ApodBanner';

interface ApodData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
}

interface MarsData {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export function App() {
  const [bannerApodData, setBannerApodData] = useState<ApodData[]>([]);
  const [bannerMarsData, setBannerMarsData] = useState<MarsData[]>([]);
  
  // NASA's Astronomy Picture of the Day (APOD) API
  useEffect(() => {
    async function fetchAPIDataApod() {
      try {
        const response = await fetch('http://localhost:3001/nasa-apod');
        const apiData = await response.json();

        const cleanedData = {
          ...apiData,
          copyright: apiData.copyright ? apiData.copyright.replace(/\n/g, ' ').trim() : 'Unknown',
        };
        setBannerApodData([cleanedData]);
        
        console.log('APOD API Data:', apiData);
      } catch (error) {
        console.error('Error fetching from backend:', error);
      }
     }
    fetchAPIDataApod();
  }, []);

  // NASA's Mars Rover Photos API
  useEffect(() => {
    async function fetchAPIDataMars() {
      try {
        const response = await fetch('http://localhost:3001/mars-photos');
        const apiData = await response.json();
        setBannerMarsData(apiData.photos);  // Use 'photos' array from the response
        console.log('Mars Photos API Data:', apiData);
      } catch (error) {
        console.error('Error fetching Mars Rover photos from backend:', error);
      }
    }
    fetchAPIDataMars();
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

        {/* Card APOD */}
        <Dialog.Root>
          {bannerApodData.map(bannerApodData => {
            const shortenedDescription = bannerApodData.explanation.split(' ').slice(0, 15).join(' ') + '...';

            return (
              <div key={bannerApodData.date}>
                <ApodBanner
                  bannerUrl={bannerApodData.media_type === 'image' ? bannerApodData.url : bannerApodData.hdurl}
                  date={bannerApodData.date}
                  title={bannerApodData.title}
                  description={shortenedDescription}
                />
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/60 fixed inset-0" />
                  <Dialog.Content className="fixed bg-[#262634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
                    <Dialog.Title className="text-2xl">
                      {bannerApodData.title}
                    </Dialog.Title>
                    <Dialog.Description className='pt-4'>
                      {bannerApodData.explanation}
                    </Dialog.Description>
                  </Dialog.Content>
                </Dialog.Portal>
              </div>
            );
          })}
        </Dialog.Root>

        {/* Card Mars Rover Photos */}
        <Dialog.Root>
          {bannerMarsData.map(photo => {
            return (
              <div key={photo.id}>
                <MarsBanners
                  img_src={photo.img_src}
                  earth_date={photo.earth_date}
                  camera_full_name={photo.camera.full_name}  // Nested camera details
                  rover_name={photo.rover.name}  // Nested rover details
                  id={photo.id.toString()}  // Convert ID to string if needed
                />
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/60 fixed inset-0" />
                  <Dialog.Content className="fixed bg-[#262634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
                    <Dialog.Title className="text-2xl">
                      Photo ID: {photo.id}
                    </Dialog.Title>
                    <Dialog.Description className='pt-4'>
                      Taken by {photo.rover.name} Rover using {photo.camera.full_name} on {photo.earth_date}.
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