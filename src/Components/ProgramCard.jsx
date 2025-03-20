import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

const ProgramCard = ({ data, idx }) => {
    return (
        <NavLink to={`/dashboard/program/details/${data._id}`} className={`hind px-2 text-lg py-4 w-full space-y-2 lg:w-[400px] to-[#fff] ${idx % 2 === 0 ? 'border-l-[6px] border-l-[#99C1B9] bg-gradient-to-r from-[#99c1b931] text-left' : ' border-l-[6px] border-l-[#beb2ffd3] bg-gradient-to-r from-[#beb2ff3d]'}`} >
            <p className=''>প্রোগ্রামের নামঃ {data.name}</p>
            <p className=''>স্থানঃ {data.location}</p>
            <p>তারিখঃ {data.date}</p>
            <p>সময়ঃ {data.time}</p>
        </NavLink>
    );
};

ProgramCard.propTypes = {
    data: PropTypes.object,
    idx: PropTypes.number,
};

export default ProgramCard;