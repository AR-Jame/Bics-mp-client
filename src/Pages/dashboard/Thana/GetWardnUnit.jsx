import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../../usehook/useAxiosPublic';
import WardCard from '../../../Components/WardCard';
import UnitCard from '../../../Components/UnitCard';
import { NavLink } from "react-router-dom";
import { Plus } from 'lucide-react';


const GetWardnUnit = ({ query }) => {
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
        <div className='flex flex-wrap gap-6'>
            {query === 'ward' ?
                <>
                    {data.map(ward => <WardCard key={ward._id} ward={ward} />)}
                    <NavLink to='/dashboard/create-ward'>
                        <button className="btn btn-circle fixed bottom-12 lg:bottom-6 right-2 btn-info text-white"><Plus /></button>
                    </NavLink>
                </>
                :
                <>
                    {data.map(unit => <UnitCard key={unit._id} unit={unit} />)}
                    <NavLink to='/dashboard/create-unit'>
                        <button className="btn btn-circle fixed bottom-12 lg:bottom-6 right-2 btn-info text-white"><Plus /></button>
                    </NavLink>
                </>
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