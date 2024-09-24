import * as Dialog from '@radix-ui/react-dialog';

interface ContentBannerProps {
    bannerUrl: string;
    title: string;
    description: string;
    date: string;
}

export default function ApodBanner(props: ContentBannerProps) {
    return (
        <Dialog.Trigger className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            
            {/* Image */}
            <img src={props.bannerUrl} alt={props.title} className="rounded-t-lg" />

            {/* Content Box */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-5 text-left">
                <a href="#" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15" />
                    </svg>
                    Astronomy Picture of the Day {props.date}
                </a>
                <h2 className="text-gray-900 dark:text-white text-2xl font-extrabold mb-2">{props.title}</h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{props.description}</p>
            </div>
        </Dialog.Trigger>
    );
}
