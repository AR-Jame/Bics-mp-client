import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import useUser from "../../usehook/useUser";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient()

    const { userData } = useUser();


    const { mutate } = useMutation({
        mutationFn: async (role) => {
            const res = await axiosSecure.put(`/user/me/${userData?.email}`, role)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile', userData?.email]);
        },
        onError: (err) => {
            console.log(err);
        }
    })

    console.log(userData?.activeRole);

    const handleCng = async (role) => {
        if (role.id === userData?.activeRole.id) return console.log('i am already in roleing');

        if (role.area === 'থানা') role = { ...role, areaName: userData?.thana }
        else if (role.area === 'ওয়ার্ড') role = { ...role, areaName: userData?.ward }
        else if (role.area === 'উপশাখা') role = { ...role, areaName: userData?.unit }

        mutate(role)
    }

    return (
        <div className="flex flex-col items-center">
            <h5>{userData?.name}</h5>
            <p>{userData?.email}</p>
            <img src={userData?.image} width={500} height={500} />

            {
                userData?.responsibility.map((role, idx) =>
                    <button
                        onClick={() => handleCng(role)}
                        className="btn"
                        key={idx}
                    >{role.position}
                    </button>
                )
            }

        </div>
    );
};

export default Profile;