import { useState } from "react";
import logo from '/Logo.png'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { NavLink } from "react-router-dom";
import useAuth from "../usehook/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    console.log(user);

    // const handleLogOut = () => {
    //     logOut()
    // }
    const lgLiClass = 'hover:bg-[#f1f1ef] text-lg font-medium active:text-[#FD9810] cursor-pointer px-3 py-3 rounded-md transition-bg'
    const smLiClass = 'w-[250px] active:text-[#FD9810] text-center hover:bg-[#f1f1ef] py-2 transition-all cursor-pointer text-xl font-medium'

    return (
        <div>
            {/* for lg device */}
            <div className='hidden justify-between hind items-center px-[10%] glass py-2 top-0 w-full lg:flex'>
                <div>
                    <NavLink to={'/'}><img src={logo} className='w-20' /></NavLink>
                </div>
                <ul className='flex gap-3'>
                    {
                        user && user.email ?

                            <>
                                <NavLink to='/dashboard/manpower'><li className={lgLiClass}>ড্যাশবোর্ড</li></NavLink>
                                <NavLink to='/post'><li className={lgLiClass}>পোস্ট</li></NavLink>
                                <NavLink to='/profile'><img src={user.photoURL} width={50} height={50} className="rounded-full" /></NavLink>
                                <button onClick={logOut} className="btn">logOut</button>
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
            {/* for mobile device */}
            <div className='flex lg:hidden justify-between items-center mx-10'>
                <div>
                    <button onClick={toggleDrawer} className='text-2xl font-bold'>x</button>
                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='left'
                        className='bla bla bla'
                    >
                        <ul className='flex flex-col justify-center items-center gap-3 h-1/2'>
                            <>
                                <NavLink to='/'><li className={`${smLiClass}`}><button>Home</button></li></NavLink>
                                <NavLink to='/allJobs'><li className={smLiClass}>All Jobs</li></NavLink>
                                <NavLink to='/addJob'><li className={smLiClass}>Add Job</li></NavLink>
                                <NavLink to='/myApplication'><li className={smLiClass}>My Application</li></NavLink>
                                <NavLink to='/myPost'><li className={smLiClass}>My Job Post</li></NavLink>

                            </>
                        </ul>
                    </Drawer>
                </div>
                <div>
                    <img src={logo} className='w-20' />
                </div>
            </div>
        </div>
    );
};

export default Navbar;