import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Suspense } from "react";


const Root = () => {
    const location = useLocation()
    return (
        <>
            {!location.pathname.includes('dashboard') && <Navbar />}
            <Suspense fallback={<h1>loading</h1>}>
                <Outlet />
            </Suspense>
            {!location.pathname.includes('dashboard') && <Footer />}
        </>
    );
};

export default Root;