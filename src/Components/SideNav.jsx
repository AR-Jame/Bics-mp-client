import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import logo from '../assets/shibir.png';
import control from '../assets/control.png';
import wisher from '../assets/wish-list.png';
import group from '../assets/group.png';
import dashboard from '../assets/dashboard.png';
import discussion from '../assets/discussion.png';
import req from '../assets/add-user.png'
import { NavLink } from 'react-router-dom';
import useUserContext from '../usehook/useUserContext';

let ThanaMenus;
let WardMenus;
let UnitMenus;

const SideNav = ({ open, setOpen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const { userData } = useUserContext();


    ThanaMenus = [
        { title: "সকল জনশক্তি", src: group, to: '/dashboard/manpower', },
        { title: "সকল শুভাকাঙ্ক্ষী", src: wisher, to: '/dashboard/wisher', },
        { title: "ওয়ার্ড & উপশাখা", src: dashboard, to: '/dashboard/ward-unit', },
        { title: "সকল প্রোগ্রাম", src: discussion, to: '/dashboard/programs' },
        { title: "রিকুয়েস্টস", src: req, to: '/dashboard/request' },
    ];
    WardMenus = [
        { title: "সকল জনশক্তি", src: group, to: '/dashboard/ward-unit-manpower' },
        { title: "সকল শুভাকাঙ্ক্ষী", src: wisher, to: '/dashboard/wisher' },
        { title: "সকল উপশাখা", src: dashboard, to: '/dashboard/unit-list' },
        { title: "সকল প্রোগ্রাম", src: discussion, to: '/dashboard/programs' },
    ];
    UnitMenus = [
        { title: "সকল জনশক্তি", src: group, to: '/dashboard/ward-unit-manpower' },
        { title: "সকল শুভাকাঙ্ক্ষী", src: wisher, to: '/dashboard/wisher' },
        { title: "সকল প্রোগ্রাম", src: discussion, to: '/dashboard/programs' },
    ];





    let Menus;

    if (userData?.activeRole?.area === 'থানা') Menus = ThanaMenus
    else if (userData?.activeRole?.area === 'ওয়ার্ড') Menus = WardMenus
    else if (userData?.activeRole?.area === 'উপশাখা') Menus = UnitMenus

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Sidebar for larger screens */}
            <div className={`fixed top-0 left-0 h-screen bg-dark-purple p-5 pt-8 shadow-sm hind bg-[#eeeded86] duration-300 ${isMobile ? 'hidden' : open ? 'w-52' : 'w-20'}`}>
                <img
                    src={control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple rounded-full ${!open && 'rotate-180'}`}
                    onClick={() => setOpen(!open)}
                />

                <NavLink to='/'>
                    <div className="flex gap-x-4 items-center">
                        <img src={logo} className={`cursor-pointer max-w-14 mx-auto ${open ? '' : 'pr-2'}`} />
                    </div>
                </NavLink>

                <ul className="pt-6">
                    {Menus?.map((Menu, index) => (
                        <NavLink to={Menu.to} key={index}>
                            <li className="flex items-center gap-x-4 p-2 rounded-md cursor-pointer hover:bg-[#f7b8bc2d] text-black text-sm mt-2">
                                <img src={Menu.src} className="w-6" />
                                <span className={`${!open && 'hidden'} origin-left duration-200`}>{Menu.title}</span>
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </div>

            {/* Bottom navigation for mobile */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 w-full bg-dark-purple p-2 hind flex justify-around items-center shadow-md">
                    {Menus.map((Menu, index) => (
                        <NavLink to={Menu.to} key={index} className="flex flex-col items-center text-white focus:outline-none">
                            <img src={Menu.src} className="w-6 mb-1" />
                            {/* <span className="text-[12px] text-black">{Menu.title}</span> */}
                        </NavLink>
                    ))}
                </div>
            )}
        </>
    );
};

SideNav.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

export default SideNav;
