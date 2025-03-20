import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

const UnitCard = ({ unit }) => {
    return (
        <div key={unit._id} className={`hind w-full lg:w-[400px] border-l-8 shadow-md border-l-cyan-400  p-5 flex justify-between items-center`}>
            <div>
                <NavLink to={`/dashboard/ward-Unit-details/${unit.unit}?query="unit"`} className="text-xl font-medium active:border-b">{unit.unit}</NavLink>
                <p>{unit.ward}</p>
                <p className="">{unit.thana}</p>
            </div>
        </div>
    );
};

UnitCard.propTypes = {
    unit: PropTypes.object,
};

export default UnitCard;