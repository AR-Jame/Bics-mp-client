import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxiosPublic from '../usehook/useAxiosPublic';
import { NavLink } from 'react-router-dom';

const WisherCard = ({ data, idx }) => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient()
    const { name, phone, currentPayment, _id } = data;
    const { mutate } = useMutation({
        mutationFn: async () => {
            const month = currentPayment.month
            const res = await axiosPublic.put(`/wisher/${_id}`, { month })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wisher'])
        }
    })

    return (
        <tr className={`py-2 flex my-2 px-4 justify-between ${currentPayment.status === 'paid' ? 'bg-green-400' : 'bg-red-500'} `}>
            <td>{idx}</td>
            <td className=''>{name}</td>
            <td>{phone}</td>
            {
                currentPayment.status === 'unpaid' ?
                    <>
                        <td>{currentPayment.month}</td>
                        <td onClick={() => mutate()} className='bg-[#fff] btn'>Pay</td>
                    </>
                    :
                    <td>{currentPayment.paidAt}</td>
            }
            <td>
                <NavLink to={`/dashboard/wisher/${_id}`}>
                    <button className='btn'>See details</button>
                </NavLink>
            </td>
        </tr>
    );
};
WisherCard.propTypes = {
    data: PropTypes.object,
    idx: PropTypes.number,

};

export default WisherCard;