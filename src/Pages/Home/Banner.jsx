const Banner = () => {
    return (
        <div className='flex flex-col-reverse lg:flex-row items-center justify-center mx-[5%]'>
            <div className='text-center flex-1 lg:mx-auto mahin'>
                <h1 className='2xl:text-8xl 2xl:my-auto text-5xl 2xl:leading-28'>বাংলাদেশ <span className='text-cyan-400'>ইসলামি</span> ছাত্রশিবির</h1>
                <h4 className='text-2xl lg:text-4xl mt-2.5 mb-8 text-[#1a1919b6]'>ঢাকা মহানগর দক্ষিণ, <span className='text-[#000000]'>মাতুয়াইল পূর্ব থানা</span></h4>
                <p className='text-xl lg:text-3xl mt-3.5 text-[#ff846f] font-thin'>সংগ্রাম আর সাহসী জীবন <br /> সততায় ভরা মন <br /> জ্ঞানের আলোয় বিপ্লব হবে <br /> নতুন উজ্জীবন</p>
            </div>
            <div className='flex-1'>
                <img
                    width={1017}
                    height={772}
                    className='w-full'
                    loading="lazy"
                    srcSet="https://res.cloudinary.com/dypz844df/image/upload/v1741691857/banner_400w_kwjsjw.webp 600w, https://res.cloudinary.com/dypz844df/image/upload/v1741680057/banner_vrztvd.webp, 1700w"
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src="https://res.cloudinary.com/dypz844df/image/upload/v1741680057/banner_vrztvd.webp"
                />
            </div>
        </div>
    );
};

export default Banner;