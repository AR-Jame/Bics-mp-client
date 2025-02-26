import { createContext } from "react";
import PropTypes from "prop-types";
import useUser from "./useUser";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const { userData } = useUser()
    console.log(userData, 'from provider');
    const userInfo = { userData, test: 'i am for testing' }
    return (
        <UserContext value={userInfo}>
            {children}
        </UserContext>
    );
};
export default UserProvider;
UserProvider.propTypes = {
    children: PropTypes.node
}
