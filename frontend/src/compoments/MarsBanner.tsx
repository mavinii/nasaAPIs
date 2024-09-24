import * as Dialog from '@radix-ui/react-dialog';

interface MarsBannersProps {
    id: string;
    img_src: string;
    earth_date: string;
    camera_full_name: string;
    rover_name: string;
  }

  export default function MarsBanners(props: MarsBannersProps) {
    return (
      <Dialog.Trigger className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <img src={props.img_src} alt={props.rover_name} className="rounded-t-lg object-cover h-80 w-full" />
        
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-5 text-left">
          <a href="#" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
            {props.rover_name} Rover - {props.camera_full_name}
          </a>
          <h2 className="text-gray-900 dark:text-white text-2xl font-extrabold mb-2">Photo ID: {props.id}</h2>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Taken on: {props.earth_date}</p>
        </div>
      </Dialog.Trigger>
    );
  }