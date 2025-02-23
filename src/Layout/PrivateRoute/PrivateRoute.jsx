import PropTypes from 'prop-types';
import useAuth from '../../usehook/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if(loading) return <p>loading ....</p>

    if (!user) return <Navigate to={'/sign-up'}/>;

    return children


};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;