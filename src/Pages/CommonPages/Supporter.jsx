import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import useUserContext from "../../usehook/useUserContext";
import { Plus } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

const Supporter = () => {
    const axiosSecure = useAxiosSecure();
    const { userData } = useUserContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    console.log(userData);
    const { data, isLoading } = useQuery({
        queryKey: ['supporter'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/supporter?area=${userData?.activeRole?.area}&areaName=${userData?.activeRole?.areaName}`)
            return res.data
        }
    })
    console.log(data);

    const handleRemove = async (_id) => {
        const res = await axiosSecure.delete(`/supporter/${_id}`)
        console.log(res.data);
        if (res.data.deletedCount > 0) {
            queryClient.invalidateQueries('supporter')
            navigate('/dashboard/supporter')
        }
    }
    if (isLoading) return <p>loading ...</p>
    return (
        <div className="hind">
            <p className="text-xl lg:text-2xl text-center">সমর্থক তালিকা, <span className="text-cyan-400 font-medium">{userData.activeRole.areaName} {userData.activeRole.area}</span></p>
            <div className="flex flex-wrap">
                {
                    data.map(supporter =>
                        <div key={supporter._id} className="space-y-1.5 text-left text-lg p-10 border shadow-lg rounded-2xl">
                            <p className="text-2xl text-center">{supporter.name}</p>
                            <hr className="my-2" />
                            <p>ফোনঃ {supporter.phone}</p>
                            <p>ঠিকানাঃ {supporter.location}</p>
                            <p>থানাঃ {supporter.thana}</p>
                            <p>ওয়ার্ডঃ {supporter.ward}</p>
                            <p>উপশাখাঃ {supporter.unit}</p>
                            <button onClick={() => handleRemove(supporter._id)} className="btn btn-info btn-soft text-center hover:text-white w-full mt-2">সরিয়ে ফেলুন</button>
                        </div>
                    )
                }
            </div>
            <NavLink to='/dashboard/add-supporter'>
                <button type="button" className="btn btn-circle btn-md btn-primary fixed bottom-12 right-6"><Plus /></button>
            </NavLink>
        </div>
    );
};

export default Supporter;