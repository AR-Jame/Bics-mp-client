import PropTypes from 'prop-types';

const ProgramCard = ({ data }) => {
    return (
        <div>
            <h2>{data.name}</h2>
        </div>
    );
};

ProgramCard.propTypes = {
    data: PropTypes.object,
};

export default ProgramCard;