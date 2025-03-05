import { lazy } from 'react';
import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import UserProvider from '../usehook/UserProvider';

const Login = lazy(() => import('../Pages/signIn&Up/Login'))
const SignUp = lazy(() => import('../Pages/signIn&Up/SignUp'))
const Dashboard = lazy(() => import('../Layout/Dashboard'));
const Wisher = lazy(() => import('../Pages/CommonPages/Wisher'))
const ThanaManPower = lazy(() => import('../Pages/dashboard/Thana/ThanaManPower'))
const Requests = lazy(() => import('../Pages/dashboard/Thana/Requests'))
const AddWisher = lazy(() => import('../Pages/CommonPages/AddWisher'))
const WisherDetails = lazy(() => import('../Components/WisherDetails'));
const UpdateWisher = lazy(() => import('../Pages/CommonPages/UpdateWisher'));
const AcceptReq = lazy(() => import('../Pages/signIn&Up/AcceptReq'))
const WardnUnit = lazy(() => import('../Pages/dashboard/Thana/WardnUnit'))
const CreateWard = lazy(() => import('../Pages/dashboard/Thana/CreateWard'))
const CreateUnit = lazy(() => import('../Pages/dashboard/Thana/CreateUnit'))
const Profile = lazy(() => import('../Pages/Profile/Profile'))
const Home = lazy(() => import('../Pages/Home/Home'))
const CreateProgram = lazy(() => import('../Pages/CommonPages/CreateProgram'))
const Programs = lazy(() => import('../Pages/CommonPages/Programs'))
const Unit = lazy(() => import('../Pages/dashboard/Ward/Unit'))
const WardManPower = lazy(() => import('../Pages/dashboard/Ward/WardManPower'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/sign-up', element: <SignUp /> },
            { path: '/accept-req', element: <AcceptReq /> },
            { path: '/profile', element: <Profile /> },
            {
                path: '/dashboard',
                element: <UserProvider><PrivateRoute><Dashboard /></PrivateRoute></UserProvider>,
                children: [
                    // thana dashboard
                    { path: 'manpower', element: <ThanaManPower /> },
                    { path: 'wisher', element: <Wisher /> },
                    { path: 'request', element: <Requests /> },
                    { path: 'create-wisher', element: <AddWisher /> },
                    { path: 'wisher/:id', element: <WisherDetails /> },
                    { path: 'update-wisher/:id', element: <UpdateWisher /> },
                    { path: 'ward-unit', element: <WardnUnit /> },
                    { path: 'create-ward', element: <CreateWard /> },
                    { path: 'create-unit', element: <CreateUnit /> },
                    { path: 'programs', element: <Programs /> },
                    { path: 'create-program', element: <CreateProgram /> },


                    // ward dashboard
                    { path: 'ward-unit-manpower', element: <WardManPower /> },
                    { path: 'unit-list', element: <Unit /> }
                ],
            },
        ],
    },
]);

export default router