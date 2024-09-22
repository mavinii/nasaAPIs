interface ContentBannerProps {
    bannerUrl: string;
    title: string;
    description: string;
}

export default function ContentBanner(props: ContentBannerProps) {
    return (
        <a href="" className='relative rounded-lg overflow-hidden'>
            <img src={props.bannerUrl} alt="" className='transition-all duration-300 hover:scale-110' />
            <div className='w-full pt-16 pb-4 px-4 bg-image-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block'>{props.description}</span>
            </div>
        </a>
    )
}