export default function ContentFooter() {
    return (
        <div className='pt-1 self-stretch rounded-lg mt-8 mb-8'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center rounded-lg '>
                <div>
                    <strong className='text-2xl text-white block'>About this project</strong>
                    <span className='text-zinc-400 block'>
                        Click the button below to know more about Bounce Insights.
                    </span>
                </div>
                <button
                    onClick={() => window.location.href = "https://www.bounceinsights.com/"}
                    className='font-bold px-4 py-3 bg-[#dd4bd8] hover:bg-[#973394] rounded-lg'>
                    Know More
                </button>
            </div>
        </div>
    )
}