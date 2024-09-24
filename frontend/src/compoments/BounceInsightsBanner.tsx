export default function BounceInsightsBanner() {
    const bannerUrl = 'https://cdn.prod.website-files.com/6605d052b6285185135a565d/6621c32dd19859ef8978aba1_Our%20Expert%20Team-p-1080.webp';

    return (
        <div className="flex flex-col h-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src={bannerUrl} className="rounded-t-lg object-cover h-80 w-full" />

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-5 text-left">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime='#' className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                        ...
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
            </div>
        </div>
    )
}