import { useQuery } from "@tanstack/react-query";
import ReqCard from "./ReqCard";
import useAxiosSecure from "../../../usehook/useAxiosSecure";

const Requests = () => {
    const axiosSecure = useAxiosSecure();

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
            <div className="grid grid-cols-4">
                {
                    data.map(single => <ReqCard key={single._id} data={single} />)
                }
            </div>
        </div>
    );
};

export default Requests;