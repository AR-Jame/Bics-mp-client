import { NavLink } from "react-router-dom";
import useUserContext from "../../usehook/useUserContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import ProgramCard from "../../Components/ProgramCard";
import { Plus } from "lucide-react";

const Programs = () => {
    const { userData } = useUserContext();
    const axiosSecure = useAxiosSecure();
    console.log(userData);

    const { areaName } = userData.activeRole;

    const { data, isLoading } = useQuery({
        queryKey: ['program'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/program?areaName=${areaName}`);
            return res.data
        }
    })
    console.log(data);
    if (isLoading) return <p>loading ...</p>
    return (
        <div className="mx-[5%] hind lg:mx-auto relative">
            <p className="text-xl lg:text-2xl text-center mt-4 mb-10">প্রোগ্রামের তালিকা, <span className="text-cyan-400 font-medium">{userData.activeRole.areaName} {userData.activeRole.area}</span></p>
            <div className="flex flex-wrap gap-4 justify-around">
                {
                    data.map((program, idx) => <ProgramCard data={program} idx={idx} key={program._id} />)
                }
            </div>
            <div>
                <NavLink to={'/dashboard/create-program'} className={'fixed bottom-12 right-5'}>
                    <button className="btn btn-circle btn-info"><Plus color="white"/></button>
                </NavLink>
            </div>
        </div>
    );
};

export default Programs;