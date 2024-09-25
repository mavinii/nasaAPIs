export default function BounceInsightsBanner() {
    const bannerUrl = 'https://cdn.prod.website-files.com/6605d052b6285185135a565d/6621c32dd19859ef8978aba1_Our%20Expert%20Team-p-1080.webp';

    // Get today's date
    const today = new Date();

    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(today);

    return (
        <div className="flex flex-col h-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src={bannerUrl} className="rounded-t-lg object-cover h-80 w-full" />

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-5 text-left">
                <div className="flex items-center gap-x-4 text-xs">
                    <time className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                        {formattedDate}
                    </time>
                    <a className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                        People
                    </a>
                    <a className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                        AI
                    </a>
                </div>
                <h2 className="text-gray-900 dark:text-white text-2xl font-extrabold mb-2">
                    Bounce Insights
                </h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                    Bounce is the insights platform for progressive brand leaders, combining deep expert consultancy with advanced technology.
                </p>
                <a href="https://www.bounceinsights.com" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                    See more
                    <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                </a>
            </div>
        </div>
    )
}