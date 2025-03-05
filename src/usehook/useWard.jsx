import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWard = () => {
    
    const axiosPublic = useAxiosPublic()
    const { data: wards = [] } = useQuery({
        queryKey: ['ward'],
        queryFn: async () => {
            const res = await axiosPublic.get('/wardnunit/ward')
            return res.data
        }
    })


    return wards
};

export default useWard;