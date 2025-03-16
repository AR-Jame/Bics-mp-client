import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../usehook/useAxiosSecure';

const ReqCard = ({ data }) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (prop) => {
            if (prop === 'accept') {
                await axiosSecure.put(`/user/accept-req/${data._id}`, data)
            }
            else {
                await axiosSecure.delete(`/user/decline-req/${data._id}`, data)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        },
        onError: (error) => {
            console.log(error);
        }
    })
    return (
        <div>
            <p className='text-2xl'>{data.name}</p>
            <img width={200} src={data.image} />
            <button onClick={() => mutate('accept')} className='btn btn-success mr-2 text-white'>Accept </button>
            <button onClick={() => mutate('decline')} className='btn btn-error text-white'>Decline</button>
        </div>
    );
};

ReqCard.propTypes = {
    data: PropTypes.object,
};

export default ReqCard;