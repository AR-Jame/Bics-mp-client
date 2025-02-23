import sideImg from '../../assets/sideImage.png'

const Goals = () => {
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center lg:mx-[10%] mx-[5%] text-center'>
            <div className=''>
                <img src={sideImg} />
            </div>
            <div>
                <h2 className="mahin lg:text-7xl text-4xl mb-8">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
                <span className="text-cyan-400 lg:text-8xl">❝</span>
                <p className="hind lg:text-4xl text-2xl mb-5 -mt-5"> আল্লাহ প্রদত্ত ও রাসুল সাঃ প্রদর্শিত বিধান অনুযায়ী <br /> মানুষের সার্বিক জীবনের পুনর্বিন্যাস সাধন করে আল্লাহর সন্তোষ অর্জন।</p>
                <span className="text-cyan-400 lg:text-8xl ">❞</span>
            </div>
        </div>
    );
};

export default Goals;