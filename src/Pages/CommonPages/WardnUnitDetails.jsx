import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams, useSearchParams } from 'react-router';
import useAxiosSecure from '../../usehook/useAxiosSecure';
import { Component, HandHeart, Layers, User } from 'lucide-react';

const WardnUnitDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')

    const { data = [], isLoading } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wardnunit/details/${id}?query=${query}`)
            return res.data
        }
    })
    if (isLoading) return <p>loading ...</p>

    let count = 0;
    const handlePresence = () => {
        data?.programs?.map(program => {
            let attendance = program.attendance
            for (let i in attendance) {
                if (attendance[i] === 'present') {
                    count += 1
                }
            }
            program.count = count
            count = 0
        })
    }
    handlePresence()
    console.log(count);


    console.log(data);
    return (
        <div className="hind mx-[5%] lg:mx-[10%]">
            <h4 className='text-3xl text-center mb-6'>{data.areaData[0].unit ? data.areaData[0].unit : data.areaData[0].ward}</h4>
            <div className='flex flex-wrap gap-8 justify-center'>
                <div className='px-2 py-7 text-center border-l-8 border-amber-200 bg-gradient-to-r from-[#fee6853b] to-[#ffffff] w-full lg:w-1/3'>
                    <p className='text-xl font-medium'>জনশক্তি তালিকা</p>
                    <div className='px-2 space-y-1 mt-3'>
                        {
                            data?.users?.map(user => <p key={user._id} className='flex items-center gap-1 text-lg'><User size={20} />{user.name}</p>)
                        }
                    </div>
                </div>
                <div className='px-2 py-7 text-center border-l-8 border-l-lime-300 bg-gradient-to-r from-[#bbf4511c] to-[#ffffff] w-full lg:w-1/3'>
                    <p className='text-xl font-medium'>শুভাকাঙ্ক্ষী তালিকা</p>
                    <div className='px-2 space-y-1 mt-3'>
                        {
                            data?.wishers?.map(wisher =>
                                <div key={wisher._id} className='flex justify-between items-center gap-2'>
                                    <p className='flex items-center gap-1 text-lg'><HandHeart color='#FE7689' size={20} />{wisher.name}</p>
                                    <p className='pl-3 text-[#353434]'>ফোনঃ {wisher.phone}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='px-2 py-7 text-center border-l-8 border-l-[#BE6E46] bg-gradient-to-r from-[#be6e4621] to-[#ffffff] w-full lg:w-1/3'>
                    <p className='text-xl font-medium'>প্রোগ্রামসমূহ</p>
                    <div className='px-2 space-y-1 mt-3'>
                        {
                            data?.programs?.map(program =>
                                <div key={program._id} className='flex items-center justify-around'>
                                    <p className='flex items-center gap-1 text-lg'><Layers size={18} />{program.name}</p>
                                    <p>উপস্থিতিঃ {program.count}</p>
                                </div>)
                        }
                    </div>
                </div>

                {
                    data?.units &&
                    <div className='px-2 py-7 text-center border-l-8 border-l-[#127475] bg-gradient-to-r from-[#1273751f] to-[#ffffff] w-full lg:w-1/3'>
                        <p className='text-xl font-medium'>উপশাখাসমূহ</p>
                        <div className='px-2 space-y-1 mt-3'>
                            {
                                data?.units?.map(unit =>
                                    <div key={unit._id} className='flex items-center justify-around'>
                                        <NavLink to={`/dashboard/ward-Unit-details/${unit.unit}?query="unit"`} className='flex items-center gap-1 text-lg'><Component size={18} />{unit.unit}</NavLink>
                                    </div>)
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};
export default WardnUnitDetails;