import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../../usehook/useAxiosPublic';
import WardCard from '../../../Components/WardCard';
import UnitCard from '../../../Components/UnitCard';

const GetWardnUnit = ({ query}) => {
    const axiosPublic = useAxiosPublic();
    const { data = [] } = useQuery({
        queryKey: [query],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wardnunit/${query}`)
            return res.data
        }
    })
    console.log(data);
    return (
        <div>
            {query === 'ward' ?
                data.map(ward => <WardCard key={ward._id} ward={ward} />)
                :
                data.map(unit => <UnitCard key={unit._id} unit={unit} />)
            }
        </div>
    );
};

GetWardnUnit.propTypes = {
    query: PropTypes.string,
    area: PropTypes.string,
    areaName: PropTypes.string,
};

export default GetWardnUnit;