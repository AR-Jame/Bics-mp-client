import PropTypes from 'prop-types';

const ManPowerCard = ({ data }) => {
    return (
        <div className='border flex flex-col justify-center items-center'>
            <img src={data.image} className='w-[350px] h-[350px] object-contain' />
        </div>
    );
};

ManPowerCard.propTypes = {
    data: PropTypes.object
};

export default ManPowerCard;