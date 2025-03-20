import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

const WardCard = ({ ward }) => {
    console.log(ward);
    return (
        <div key={ward._id} className={`hind bg-white w-full lg:w-[400px] border-l-8 shadow-md border-l-cyan-400  p-5`}>
            <NavLink to={`/dashboard/ward-Unit-details/${ward.ward}?query="ward"`} className="text-xl font-medium active:border-b">{ward.ward}</NavLink>
            <p className="mt-2">{ward.thana}</p>
        </div>
    );
};

WardCard.propTypes = {
    ward: PropTypes.object
};

export default WardCard;