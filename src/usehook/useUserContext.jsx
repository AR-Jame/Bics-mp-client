import { useContext } from "react";
import { UserContext } from "./UserProvider";

const useUserContext = () => {
    const userInfo = useContext(UserContext)
    return userInfo;
};

export default useUserContext;