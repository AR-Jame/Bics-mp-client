const Goals = () => {
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center lg:mx-[10%] mx-[5%] text-center'>
            <div className=''>
                <img
                    width={634}
                    height={734}
                    src='https://res.cloudinary.com/dypz844df/image/upload/v1741680470/sideImage_uwkyz3.webp'
                    srcSet="https://res.cloudinary.com/dypz844df/image/upload/v1741691861/sideImage_400_zwhhrg.webp 600w, https://res.cloudinary.com/dypz844df/image/upload/v1741680470/sideImage_uwkyz3.webp, 1700w"
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
            <div>
                <h2 className="mahin lg:text-7xl text-4xl mb-8">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
                <span className="text-cyan-400 lg:text-8xl text-5xl">❝</span>
                <p className="hind lg:text-4xl text-2xl mb-5 mt-3 lg:-mt-5"> আল্লাহ প্রদত্ত ও রাসুল সাঃ প্রদর্শিত বিধান অনুযায়ী <br /> মানুষের সার্বিক জীবনের পুনর্বিন্যাস সাধন করে আল্লাহর সন্তোষ অর্জন।</p>
                <span className="text-cyan-400 lg:text-8xl text-5xl ">❞</span>
            </div>
        </div>
    );
};

export default Goals;