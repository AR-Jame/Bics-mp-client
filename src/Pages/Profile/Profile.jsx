import { useQuery } from "@tanstack/react-query";
import useAuth from "../../usehook/useAuth";
import useAxiosPublic from "../../usehook/useAxiosPublic";

const Profile = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { data: userData, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            if(isLoading) return <p>loading</p>;
            const res = await axiosPublic.get(`/user/me/${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    console.log(userData);
    if (isLoading) return <p>loading ....</p>
    return (
        <div className="flex flex-col items-center">
            <h5>{userData?.name}</h5>
            <p>{userData?.email}</p>
            <img src={userData?.image} width={500} height={500} />

            {
                userData?.responsibility?.map((single, idx) => <button className="btn" key={idx}>{single.position}</button>)
            }

        </div>
    );
};

export default Profile;