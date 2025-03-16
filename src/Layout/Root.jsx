import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Suspense } from "react";


const Root = () => {
    const location = useLocation()
    return (
        <>
            <Navbar />
            <Suspense fallback={<p>loading</p>}>
                <Outlet />
            </Suspense>
            {!location.pathname.includes('dashboard') && <Footer />}
        </>
    );
};

export default Root;