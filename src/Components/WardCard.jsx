import PropTypes from 'prop-types';

const WardCard = ({ ward }) => {
    return (
        <div>
            <h4>{ward.ward}</h4>
        </div>
    );
};

WardCard.propTypes = {
    ward: PropTypes.object
};

export default WardCard;