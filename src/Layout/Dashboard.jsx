import { Outlet } from "react-router-dom";
import ThanaNav from "../Components/sideNav/ThanaNav";
import { Suspense, useState } from "react";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="lg:flex lg:gap-10">

            <div className={`${open ? 'w-52' : 'w-20'}`}>
                <ThanaNav open={open} setOpen={setOpen} />
            </div>
            <div className="flex-1">
            <Suspense fallback={<h1>loading.......</h1>}>
                <Outlet />
            </Suspense>
            </div>
        </div>
    );
};

export default Dashboard;