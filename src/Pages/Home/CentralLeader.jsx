import Cp from '../../assets/Cp.jpg'
import Cvp from '../../assets/Cvp.jpg'
const CentralLeader = () => {
    return (
        <div className='lg:mx-[10%] mx-[5%] mt-16'>
            <p className='mahin text-7xl text-center mb-20'>শিবিরের কেন্দ্রীয় দায়িত্বশীলবৃন্দ</p>

            <div className='flex lg:flex-row flex-col items-center justify-around gap-10'>
                <div className='text-center'>
                    <p className='mahin text-[#3b3b3b] pb-16 text-5xl'>কেন্দ্রীয় সভাপতি</p>
                    <div className='leaderPic lg:w-[500px] mb-10'>
                        <img className='h-full w-full ' src={Cp} />
                    </div>
                    <h3 className='text text-3xl py-3'>জাহিদুল ইসলাম</h3>
                </div>
                <div className='text-center'>
                    <p className='mahin text-[#3b3b3b] pb-16 text-5xl'>কেন্দ্রীয় সেক্রেটারি</p>
                    <div className='leaderPic lg:w-[500px] mb-10'>
                        <img className='h-full w-full ' src={Cvp} />
                    </div>
                    <h3 className='text text-3xl py-3'>নুরুল ইসলাম সাদ্দাম</h3>
                </div>
            </div>
        </div>
    );
};

export default CentralLeader;