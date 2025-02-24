import useAxiosSecure from "../../usehook/useAxiosSecure";
import useUser from "../../usehook/useUser";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const userData = useUser();

    const handleCng = async (role) => {

        if (role.id === userData.activeRole.id) return console.log('i am already in roleing');

        const res = await axiosSecure.put(`/user/me/${userData.email}`, role);
        console.log(res.data);
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