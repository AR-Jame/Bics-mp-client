import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userData } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/me/${user?.email}`);
            return res.data
        },
        enabled: !!user?.email
    })

    return userData
};

export default useUser;