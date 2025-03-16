import { NavLink } from "react-router-dom";
import useUserContext from "../../usehook/useUserContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import ProgramCard from "../../Components/ProgramCard";

const Programs = () => {
    const { userData } = useUserContext();
    const axiosSecure = useAxiosSecure();
    console.log(userData);

    const { areaName } = userData.activeRole;

    const { data: programs, isLoading } = useQuery({
        queryKey: ['program'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/program?areaName=${areaName}`);
            return res.data
        }
    })

    if (isLoading) return <p>loading ...</p>
    return (
        <div>
            <div>
                {
                    programs.map(program => <ProgramCard data={program} key={program._id} />)
                }
            </div>
            <div>
                <NavLink to={'/dashboard/create-program'}>
                    <button className="btn">Create new Program</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Programs;