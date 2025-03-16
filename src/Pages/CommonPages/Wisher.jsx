import useAxiosPublic from "../../usehook/useAxiosPublic";
import WisherCard from "../../Components/WisherCard";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserContext from "../../usehook/useUserContext";

const Wisher = () => {
    const axiosPublic = useAxiosPublic();
    const { userData } = useUserContext();
    const { area, areaName } = userData.activeRole;

    const { data = [], isLoading } = useQuery({
        queryKey: ['wisher'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wisher?area=${area}&areaName=${areaName}`)
            return res.data
        }
    });

    if (isLoading) return <p>loading......</p>

    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
            <div className="w-full">
                <table className="w-full table">
                    <thead>

                    </thead>
                    <tbody className="">
                        {
                            data.map((single, idx) => <WisherCard key={single._id} idx={idx + 1} data={single} />)
                        }
                    </tbody>
                </table>
                <NavLink to='/dashboard/create-wisher'>
                    <button className="btn">Create new wisher</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Wisher;