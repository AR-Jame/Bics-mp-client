import useUserContext from "../../../usehook/useUserContext";
import GetManPower from "../../CommonPages/GetManPower";

const WardManPower = () => {
    const { userData } = useUserContext();
    // console.log(userData);
    return (
        <div>
            <GetManPower
                query={''}
                area={userData?.activeRole?.area}
                areaName={userData?.activeRole?.areaName}
            />
        </div>
    );
};

export default WardManPower;