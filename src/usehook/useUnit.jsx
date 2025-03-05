import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUnit = (ward) => {
    const axiosPublic = useAxiosPublic();
    console.log('ward data from hook', ward);
    const { data: units = [] } = useQuery({
        queryKey: ['unit', ward],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wardnunit/unit?ward=${ward}`)
            return res.data
        },
        enabled: !!ward
    })
    return units;
};

export default useUnit;