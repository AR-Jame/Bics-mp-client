const Points = () => {
    const data = [
        {
            no: '১ম দফা',
            title: 'দাওয়াত',
            text: "তরুণ ছাত্র সমাজের কাছে ইসলামের আহ্বানপৌঁছিয়ে তাদের মাঝে ইসলামী জ্ঞানার্জনএবং বাস্তব জীবনে ইসলামের পূর্ণ অনুশীলনের দায়িত্বানুভূতি জাগ্রত করা।",
            pic: 'https://res.cloudinary.com/dypz844df/image/upload/v1741680928/dawat_gh20t0.webp',
            pColor: '#65c9bb',
            sColor: '#f4fffd',
            width: 161,
            height: 126
        },
        {
            no: '২ম দফা',
            title: 'সংগঠন',
            text: 'যেসব ছাত্র ইসলামী জীবনবিধান প্রতিষ্ঠার সংগ্রামে অংশ নিতে প্রস্তুত তাদেরকে সংগঠনের অধীনে সংঘবদ্ধ করা।',
            pic: 'https://res.cloudinary.com/dypz844df/image/upload/v1741680872/team_hhojyi.webp',
            pColor: '#ff9a39',
            sColor: '#fff8f2',
            width: 268,
            height: 188
        },
        {
            no: '৩ম দফা',
            title: 'প্রশিক্ষণ',
            text: 'এই সংগঠনের অধীনে সংঘবদ্ধ ছাত্রদেরকে ইসলামী জ্ঞান প্রদান এবং আদর্শ চরিত্রবানরূপে গড়ে তুলে জাহেলিয়াতের সমস্ত চ্যালেঞ্জের মোকাবেলায় ইসলামের শ্রেষ্ঠত্ব প্রমাণ করার যোগ্যতা সম্পন্ন কর্মী হিসেবে গড়ার কার্যকরী ব্যবস্থা করা।',
            pic: 'https://res.cloudinary.com/dypz844df/image/upload/v1741683918/training_1_nxmong.webp',
            pColor: '#2984ff',
            sColor: '#eef5ff',
            width: 100,
            height: 82
        },
        {
            no: '৪ম দফা',
            title: 'ইসলামী শিক্ষা আন্দোলন ও ছাত্র সমস্যা সমাধান',
            text: 'আদর্শ নাগরিক তৈরির উদ্দেশ্যে ইসলামী মূল্যবোধের ভিত্তিতে শিক্ষা ব্যবস্থার পরিবর্তন সাধনের দাবিতে সংগ্রাম এবং ছাত্র সমাজের প্রকৃত সমস্যা সমাধানের সংগ্রামে নেতৃত্ব প্রদান।',
            pic: 'https://res.cloudinary.com/dypz844df/image/upload/v1741684011/hand_1_nb7dgr.webp',
            pColor: '#5fb35b',
            sColor: '#fbfff3',
            width: 100,
            height: 123
        },
        {
            no: '৫ম দফা',
            title: 'ইসলামী সমাজ বিনির্মান',
            text: 'অর্থনৈতিক শোষণ,রাজনৈতিক নিপীড়ন এবং সাংস্কৃতিক গোলামী হতে মানবতার মুক্তির জন্য ইসলামী সমাজ বিনির্মানে সর্বাত্মক প্রচেষ্টা চালানো।',
            pic: 'https://res.cloudinary.com/dypz844df/image/upload/v1741680816/flag_c8k9ol.webp',
            pColor: '#65c9bb',
            sColor: '#f1f1f1',
            width: 200,
            height: 277
        },
    ]
    return (
        <section className="lg:mx-[10%] 2xl:mx-[18%] mx-[5%]">
            <h2 className="text-7xl text-center mahin mb-16">আমাদের পাঁচ দফা কর্মসূচি</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 hind">
                {
                    data.map(point =>
                        <div className='space-y-6' key={point.no}>
                            <p className="text-center mahin text-4xl">{point.no}</p>
                            <div style={{ backgroundColor: point.sColor, border: '1px solid' + point.pColor, }} className='h-[480px] relative flex flex-col box_shadow border space-y-4 rounded-2xl p-5'>
                                <img width={point.width} height={point.height} src={point.pic} className='w-16 mx-auto' />
                                <h6 style={{ color: point.pColor }} className='text-2xl text-center font-semibold'>{point.title}</h6>
                                <p className='text-xl grow text-center leading-10'>{point.text}</p>
                                <span className="text-[#1f1e1e1f] lg:text-8xl text-center block">❝</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default Points;