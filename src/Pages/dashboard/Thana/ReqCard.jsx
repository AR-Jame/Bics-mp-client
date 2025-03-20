import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../usehook/useAxiosSecure';

const ReqCard = ({ data }) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (prop) => {
            if (prop === 'accept') {
                await axiosSecure.put(`/user/accept-req/${data._id}`, data)
            }
            else {
                await axiosSecure.delete(`/user/decline-req/${data._id}`, data)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        },
        onError: (error) => {
            console.log(error);
        }
    })
    return (
        <div className='border hind w-full lg:w-[450px] rounded-xl p-8 bg-[linear-gradient(to_bottom,#00D3F3_0px,#00D3F3_110px,white_110px)]'>
            <div>
                <img width={150} src={data.image} className='rounded-full w-[150px] border-8 border-white bg-white mx-auto' />
                <div className='text-center text-[#3a3737]'>
                    <p className='lg:text-2xl text-xl font-medium text-center text-black'>{data.name}</p>
                    <p>ফোনঃ {data.phone}</p>
                    <p>ইমেইলঃ {data.email}</p>
                </div>
                <div className='flex justify-around flex-col lg:flex-row lg:gap-1 space-y-5 lg:space-y-0 mt-5'>
                    <div className='lg:text-right space-y-1.5'>
                        <p className='lg:text-xl text-lg font-medium text-center'>সাংগঠনিক তথ্যঃ </p>
                        <p>মানঃ {data.level}</p>
                        <p>থানাঃ {data.thana}</p>
                        <p>ওয়ার্ডঃ {data.ward}</p>
                        <p>উপশাখাঃ {data.unit}</p>
                    </div>
                    <div className='hidden lg:block h-44 bg-[#00000031] w-0.5 z-50'></div>
                    <div className='lg:text-right'>
                        <p className='lg:text-xl text-lg font-medium text-center'>দায়িত্বসমূহ</p>
                        {
                            data.responsibility.map((role, idx) => <p key={role._id}> {idx + 1 + ". " + role.area + " " + role.position}</p>)
                        }
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center my-4'>
                <button onClick={() => mutate('accept')} className='btn btn-success mr-2 mt-3 text-white font-normal'>একসেপ্ট </button>
                <button onClick={() => mutate('decline')} className='btn btn-error btn-outline text-black font-normal mt-3 btn-md'>ডিক্লাইন</button>
            </div>
        </div>

    );
};

ReqCard.propTypes = {
    data: PropTypes.object,
};

export default ReqCard;



