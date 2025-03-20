import PropTypes from 'prop-types';

const ManPowerCard = ({ data }) => {
    const { image, name, level, thana, ward, unit, email, phone } = data
    return (
        <div className='w-full lg:w-[380px] hind p-4 rounded-4xl border shadow-lg flex flex-col justify-center items-center'>
            <img src={image} className='w-[200px] border-8 border-white h-[200px] rounded-full -translate-y-20' />
            <div className='-mt-16 space-y-3 w-full text-center'>
                <p className='text-2xl'>{name}</p>
                <p className={`text-lg w-full rounded-4xl py-2 bg-[#ace5fc]`}>{level}</p>
                <div className=''>
                    <p className='text-xl font-medium mb-3'>সাংগঠনিক পরিচয়</p>
                    <p>থানাঃ {thana}</p>
                    <p>ওয়ার্ডঃ {ward}</p>
                    <p>উপশাখাঃ {unit}</p>
                </div>
                <div>
                    <p className='text-xl font-medium mt-6'>ব্যক্তিগত তথ্য</p>
                    <p>E-mail: {email}</p>
                    <p>Phone: {phone}</p>
                </div>


            </div>
        </div>
    );
};

ManPowerCard.propTypes = {
    data: PropTypes.object
};

export default ManPowerCard;