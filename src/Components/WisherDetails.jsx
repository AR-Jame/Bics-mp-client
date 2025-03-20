import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../usehook/useAxiosSecure";

const WisherDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['wisherDetail', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wisher/${id}`)
            return res.data
        }
    })
    console.log(data);

    const handleWisherDelete = async (id) => {
        const res = await axiosSecure.delete(`/wisher/${id}`)
        if(res.data.deletedCount > 0){
            queryClient.invalidateQueries('wisher');
            navigate('/dashboard/wisher')
        }
    }

    if (isLoading) return <p>loading....</p>
    return (
        <div className="hind space-y-8  mx-[5%] flex flex-col items-center">
            <div className="w-full lg:w-[450px] px-3.5 py-8 bg-gradient-to-r from-[rgba(175,112,223,0.1)] to-[#fff] border-l-[6px] text-lg leading-relaxed border-l-[rgba(175,112,223,0.69)]">
                <p className="text-center text-xl font-medium">ব্যক্তিগত তথ্য</p>
                <p>নামঃ {data.name}</p>
                <p>ঠিকানাঃ {data.location}</p>
                <p>মোবাইল নাম্বারঃ {data.phone}</p>
                <p>এয়ানতের পরিমানঃ {data.amount}</p>
            </div>
            <div className="w-full text-center lg:w-[450px] px-3.5 py-8 bg-gradient-to-l from-[rgba(239,118,122,0.12)] to-[#fff] border-r-[6px] text-lg leading-relaxed border-r-[rgba(239,118,122,0.69)]">
                <p className="text-xl font-medium my-1">সাংগঠনিক এলাকা</p>
                <p>থানাঃ {data.thana}</p>
                <p>ওয়ার্ডঃ {data.ward}</p>
                <p>উপশাখাঃ {data.unit}</p>
            </div>
            <div className="w-full space-y-2 lg:w-[450px] px-3.5 py-8 bg-gradient-to-r from-[#60d39428] to-[#fff] border-l-[6px] text-lg leading-relaxed border-l-[rgba(96,211,148,0.69)]">
                <p className="text-xl font-medium my-1 text-center">বিএম পরিশোধের তথ্য</p>
                {
                    data.payments.map(payment =>
                        <div key={payment.month} className="bg-white p-3 rounded-lg">
                            <p>মাসঃ {payment.month}</p>
                            <p> {payment.status === 'paid' ? 'পরিশোধের তারিখঃ ' + payment.paidAt : 'আন-পেইড'}</p>
                        </div>
                    )
                }
            </div>
            <NavLink to={`/dashboard/update-wisher/${data._id}`}>
                <button className="btn btn-warning text-black btn-outline font-normal">আপডেট {data.name}</button>
            </NavLink>
            <button onClick={() => handleWisherDelete(id)} className="btn btn-error btn-outline">ডিলিট {data.name}</button>
        </div>
    );
};

export default WisherDetails;
