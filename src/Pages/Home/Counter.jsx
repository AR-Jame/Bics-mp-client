import CountUp from "react-countup";

const Counter = () => {

    const data = [
        {
            head: 'বর্তমান জনশক্তি',
            count: '150000',
        },
        {
            head: 'সর্বমোট থানা',
            count: '350',
        },
        {
            head: 'সর্বমোট সাবেক জনশক্তি',
            count: '1000000',
        },
    ]
    return (
        <section className="mahin text-center lg:mx-[10%] mx-[5%]">
            <h1 className='mahin text-7xl text-center mb-20'>শিবির, অতীত ও বর্তমান </h1>
            <div className="flex flex-col lg:flex-row justify-around items-center gap-8 rounded-xl bg-[#faa38138] p-20">
                {
                    data.map((single, idx) =>
                        <div key={idx}>
                            <p className="text-3xl">{single.head}</p>
                            <div>
                                <p className="text-7xl">+
                                    <CountUp
                                        start={single.count > 350 ? single.count > 150000 ? 950000 : 100000 : 100}
                                        end={single.count}
                                        duration={7}
                                        enableScrollSpy={true}
                                        scrollSpyOnce={true}
                                        formattingFn={(num) => {
                                            return num
                                                .toString()
                                                .replace(/0/g, "০")
                                                .replace(/1/g, "১")
                                                .replace(/2/g, "২")
                                                .replace(/3/g, "৩")
                                                .replace(/4/g, "৪")
                                                .replace(/5/g, "৫")
                                                .replace(/6/g, "৬")
                                                .replace(/7/g, "৭")
                                                .replace(/8/g, "৮")
                                                .replace(/9/g, "৯")
                                        }}
                                    />
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default Counter;