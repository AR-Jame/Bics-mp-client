import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import useAxiosPublic from "../usehook/useAxiosPublic";

const WisherDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['wisherDetail', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wisher/${id}`)
            return res.data
        }
    })
    console.log(data);
    if (isLoading) return <p>loading....</p>
    return (
        <div>
            <h1 className="text-4xl">{data.name}</h1>
            <NavLink to={`/dashboard/update-wisher/${data._id}`}>
                <button className="btn">Update {data.name}</button>
            </NavLink>
        </div>
    );
};

export default WisherDetails;