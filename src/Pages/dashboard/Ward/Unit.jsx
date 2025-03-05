import UnitCard from "../../../Components/UnitCard";
import useUnit from "../../../usehook/useUnit";
import useUserContext from "../../../usehook/useUserContext";

const Unit = () => {
    const { userData } = useUserContext();
    const { areaName } = userData.activeRole;
    const units = useUnit(areaName);
    return (
        <div>
            {
                units.map(unit => <UnitCard unit={unit} key={unit._id} />)
            }
        </div>
    );
};

export default Unit;