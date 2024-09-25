import * as Dialog from '@radix-ui/react-dialog';

interface ContentBannerProps {
    bannerUrl: string;
    title: string;
    description: string;
    date: string;
}

export default function ApodBanner(props: ContentBannerProps) {
    return (
        <Dialog.Trigger className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            
            <img src={props.bannerUrl} alt={props.title} className="rounded-t-lg  object-cover h-80 w-full" />

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-5 text-left">
                <a href="#" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15" />
                    </svg>
                    Astronomy Picture of the Day {props.date}
                </a>
                <h2 className="text-gray-900 dark:text-white text-2xl font-extrabold mb-2">{props.title}</h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{props.description}</p>
                <a href="https://apod.nasa.gov/apod/astropix.html" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                    See more
                    <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                </a>
            </div>
        </Dialog.Trigger>
    );
}
