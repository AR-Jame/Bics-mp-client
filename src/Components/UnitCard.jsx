import PropTypes from 'prop-types';

const UnitCard = ({ unit }) => {
    return (
        <div>
            <h4>{unit.unit}</h4>
        </div>
    );
};

UnitCard.propTypes = {
    unit: PropTypes.object,
};

export default UnitCard;