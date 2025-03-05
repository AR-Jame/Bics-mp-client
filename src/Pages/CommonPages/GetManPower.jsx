import ManPowerCard from "../../Components/ManPowerCard";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";


const GetManPower = ({ query, areaName, area }) => {
    const axiosSecure = useAxiosSecure();
    console.log(query);
    const { data = [], isLoading } = useQuery({
        queryKey: ['user', areaName, query],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?level=${query}&area=${area}&areaName=${areaName}`)
            return res.data;
        },
        refetchOnWindowFocus: false,
        cacheTime: 600000,
        staleTime: 300000,
    })
    console.log(data);

    if (isLoading) return <p>Loading ......</p>
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                data.map(single => <ManPowerCard key={single._id} data={single} />)
            }
        </div>
    );
};

GetManPower.propTypes = {
    query: PropTypes.string,
    areaName: PropTypes.string,
    area: PropTypes.string,
}
export default GetManPower;