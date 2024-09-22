import { useEffect, useState } from 'react';
import ContentBanner from './compoments/ContentBanner';
import logoImage from '/Bounce_Insights_Logo.svg';

interface Banner {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
}

export function App() {
  const [banner, setBanner] = useState<Banner[]>([]);

  useEffect(() => {
    // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
    fetch('example...')
      .then(response => response.json())
      .then(data => setBanner(data));
  } , []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center justify-center'>

      {/* Logo, Title and Subtitle */}
      <div className='flex flex-col items-center gap-3'>
        <img src={logoImage} alt="Bounce Insights" className='w-72 mt-32' />
        <h1 className='text-white text-4xl'>Software Engineer Challenge</h1>
        <p className="text-zinc-300 text-base">Web App that consumes NASA's APIs to display data by Marcos Oliveira.</p>
      </div>

      {/* Content Box */}
      <div className='grid grid-cols-6 gap-6 mt-16'>
        
        {/* {banner.map(banner => {
          return(
            <ContentBanner
              key={banner.date}
              bannerUrl={banner.url}
              title={banner.title} 
              description={banner.explanation}
            />
          )
        })} */}

        <ContentBanner
          bannerUrl='./game-1.png'
          title='Game 1' 
          description='This is a game.'
        />
      
      </div>

      {/* Know More Box */}
      <div className='pt-1 self-stretch rounded-lg mt-8'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center rounded-lg '>
          <div>
            <strong className='text-2xl text-white block'>Know More</strong>
            <span className='text-zinc-400 block'>
              Click the button below to know more about Bounce Insights.
            </span>
          </div>
          <button className='font-bold px-4 py-3 bg-[#dd4bd8] hover:bg-[#973394] rounded-lg'>
            Know More
          </button>
        </div>
      </div>
    </div>
  )
}