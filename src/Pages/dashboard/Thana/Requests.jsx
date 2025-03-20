import { useQuery } from "@tanstack/react-query";
import ReqCard from "./ReqCard";
import useAxiosSecure from "../../../usehook/useAxiosSecure";
import useUserContext from "../../../usehook/useUserContext";

const Requests = () => {
    const axiosSecure = useAxiosSecure();
    const {userData} = useUserContext();
    const { data = [], isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/request')
            return res.data;
        },
    })
    console.log(data);

    if (isLoading) return <p>loading ....</p>

    return (
        <div>
            <p className="text-xl hind lg:text-2xl text-center mt-4 mb-10">সমর্থক তালিকা, <span className="text-cyan-400 font-medium">{userData.activeRole.areaName} {userData.activeRole.area}</span></p>
            <div className="flex flex-wrap mx-[5%] gap-5 lg:mx-auto">
                {
                    data.map(single => <ReqCard key={single._id} data={single} />)
                }
            </div>
        </div>
    );
};

export default Requests;