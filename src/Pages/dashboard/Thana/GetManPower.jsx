import ManPowerCard from "../../../Components/ManPowerCard";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../usehook/useAxiosSecure";
const GetManPower = ({ query }) => {

    const axiosSecure = useAxiosSecure();
    const { data = [], isLoading } = useQuery({
        queryKey: ['user', query],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?level=${query}`)
            return res.data;
        }
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
}
export default GetManPower;