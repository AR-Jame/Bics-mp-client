import PropTypes from 'prop-types';
import useAuth from '../../usehook/useAuth';
import { Navigate } from 'react-router-dom';
import useUserContext from '../../usehook/useUserContext';

const PrivateRoute = ({ children }) => {
    const { userData, userLoading } = useUserContext();
    console.log(userData);
    const { user, loading } = useAuth();
    if (loading || userLoading) return <p>loading ....</p>

    if (!user) return <Navigate to={'/sign-up'} />;

    return children


};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;