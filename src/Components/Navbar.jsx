import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../usehook/useAuth";
import useUser from "../usehook/useUser";

const Navbar = () => {
    const { user } = useAuth();
    const { userData } = useUser();
    const location = useLocation()

    const area = userData?.activeRole?.area

    console.log(user);

    let redirectUrl;

    if (area === 'থানা') {
        redirectUrl = '/dashboard/manpower'
    }
    else if (area === 'ওয়ার্ড' || area === 'উপশাখা') {
        redirectUrl = '/dashboard/ward-unit-manpower'
    }

    const lgLiClass = 'hover:bg-[#f1f1ef] text-lg font-medium active:text-[#FD9810] cursor-pointer md:px-3 md:py-3 rounded-md transition-bg'

    return (
        <div className='border flex items-center justify-between hind md:px-[10%] px-[5%] py-1 top-0 w-full mb-3'>
            <div>
                {
                    // !location.pathname.includes('dashboard') &&
                    <NavLink to='/'><img width={40} height={40} src='https://res.cloudinary.com/dypz844df/image/upload/v1741681175/shibir_dyk2zy.png' className='w-10  lg:w-20' /></NavLink>
                }
            </div>
            <ul className='flex gap-3 items-center'>
                {
                    user && user.email ?

                        <>
                            <NavLink to='/'><li className={lgLiClass}>হোম</li></NavLink>
                            <NavLink to={redirectUrl}><li className={lgLiClass}>ড্যাশবোর্ড</li></NavLink>
                            <NavLink to='/post'><li className={lgLiClass}>পোস্ট</li></NavLink>
                            <NavLink to='/profile'><img src={user.photoURL} width={35} height={35} className="rounded-full border" /></NavLink>
                        </>
                        :
                        <>
                            <NavLink to='/'><li className={lgLiClass}>হোম</li></NavLink>
                            <NavLink to='/sign-up'><li className={lgLiClass}>আমাদের সাথে যুক্ত হন</li></NavLink>
                            <NavLink to='/supporter'><li className={lgLiClass}>সমর্থক হন</li></NavLink>

                        </>
                }
            </ul>
        </div>
    );
};

export default Navbar;