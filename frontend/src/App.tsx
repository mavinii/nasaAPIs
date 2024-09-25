import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import MarsBanners from './compoments/MarsBanner';
import ApodBanner from './compoments/ApodBanner';
import BounceInsightsBanner from './compoments/BounceInsightsBanner';

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
  camera: {
    id: number;
    name: string;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
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

        // Set only the first photo in the photos array
        if (apiData.photos && apiData.photos.length > 0) {
          const firstPhoto = apiData.photos[0];
          setBannerMarsData([firstPhoto]);
          console.log('Mars Photos API Data:', firstPhoto);
        }
      
      } catch (error) {
        console.error('Error fetching Mars Rover photos from backend:', error);
      }
    }
    fetchAPIDataMars();
  }, []);
  
  return (
     <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Software Engineer Challenge</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Web App that consumes NASA's APIs to display data by <a href='https://www.linkedin.com/in/pgmarcosoliveira/' className='font-bold'>Marcos Oliveira</a>
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Card 1 */}
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

          {/* Card 2 */}
          <Dialog.Root>
            {bannerMarsData.map(photo => {
              return (
                <div key={photo.id}>
                  <MarsBanners
                    img_src={photo.img_src}
                    earth_date={photo.earth_date}
                    camera_full_name={photo.camera.full_name}
                    rover_name={photo.rover.name}
                    id={photo.id.toString()}
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
            
          {/* Bounce Insights Card */}
          <BounceInsightsBanner />
        </div>
      </div>
    </div>
  )
}