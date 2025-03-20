import { Outlet } from "react-router-dom";
import SideNav from "../Components/SideNav";
import { Suspense, useState } from "react";
import useUserContext from "../usehook/useUserContext";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const { userLoading } = useUserContext();


    if (userLoading) return <p>loading ....</p>


    return (
        <div className="lg:flex lg:gap-10">
            <div className={`${open ? 'w-52' : 'w-20'}`}>
                <SideNav open={open} setOpen={setOpen} />
            </div>
            <div className="flex-1 mb-16">
                <Suspense fallback={<p>loading.......</p>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default Dashboard;