import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import useUser from "../../usehook/useUser";
import useAuth from "../../usehook/useAuth";
import edit from '../../assets/editicon.png';
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { SquarePen } from 'lucide-react';
import Swal from "sweetalert2";


const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [updateProfile, setUpdateProfile] = useState(false);

    const { userData } = useUser();
    const { user } = useAuth();


    const { mutate } = useMutation({
        mutationFn: async (role) => {
            const res = await axiosSecure.put(`/user/me/${userData?.email}`, role)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile', userData?.email]);
        },
        onError: (err) => {
            console.log(err);
        }
    })

    console.log(userData);

    const inputOptions = {};

    userData?.responsibility.forEach(role => {
        inputOptions[role.id] = role.area + " " + role.position
    })


    const handleSwal = async () => {
        await Swal.fire({
            title: "দায়িত্ব সিলেক্ট করুন",
            input: "select",
            inputOptions: inputOptions,
            inputPlaceholder: "একটি দায়িত্ব সিলেক্ট করুন",
            showCancelButton: true,
            inputValidator: (role) => {
                console.log(role);
                if (role === userData?.activeRole.id) return console.log('i am already in roleing');
                let selected = userData?.responsibility?.find(single => single.id === parseFloat(role))
                console.log(selected);
                if (selected.area === 'থানা') selected = { ...selected, areaName: userData?.thana }
                else if (selected.area === 'ওয়ার্ড') selected = { ...selected, areaName: userData?.ward }
                else if (selected.area === 'উপশাখা') selected = { ...selected, areaName: userData?.unit }
                mutate(selected)
            }
        });
    }


    const handleUpdateState = () => {
        setUpdateProfile(true)
    }
    console.log(userData);

    if (updateProfile) return <UpdateProfile user={user} userData={userData} setUpdateProfile={setUpdateProfile} />

    return (
        <div className="hind relative items-center grid grid-cols-1 lg:grid-cols-2 gap-5 mx-[5%] xl:mx-[10%]">
            <div className="space-y-4 mt-5">
                <div className="bg-[#00b5f11f] rounded-2xl py-8 text-center space-y-7">
                    <img src={userData?.image} alt={userData?.name} width={250} height={250} className="mx-auto shadow-2xl w-[250px] h-[250px] object-cover object-center rounded-full" />
                    <div className="space-y-3">
                        <h4 className="mahin text-4xl">{userData?.name}</h4>
                        <p className="text-lg font-medium">{userData?.phone}</p>
                        <p className="text-lg">{userData?.email}</p>
                        <p className="text-lg bg-blue-200 py-2">মানঃ {userData?.level}</p>
                        <p
                            className="text-lg bg-blue-200 py-2 flex justify-center items-center gap-3"
                        >{userData?.activeRole?.area + " " + userData?.activeRole?.position + ", " + userData?.activeRole?.areaName}
                            <SquarePen
                                size={20}
                                className="cursor-pointer"
                                onClick={handleSwal}
                            />
                        </p>
                    </div>
                </div>
                <div className="bg-[#00b5f11f] text-center rounded-2xl py-8 space-y-2 px-4">
                    <p className="text-lg">শিক্ষাপ্রতিষ্ঠানের নামঃ {userData?.institutionName ? userData?.institutionName : 'দেয়া হয়নি'}</p>
                    <div className="flex justify-center items-center gap-4">
                        <p>শ্রেণিঃ {userData?.batch ? userData?.batch : 'দেয়া হয়নি'}</p>
                        <p>বিভাগঃ {userData?.group}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4 mt-5">
                <div className="bg-[#00b5f11f] text-center rounded-2xl py-8 px-6 flex flex-col lg:flex-row justify-around">
                    <div className="flex-1">
                        <p>কর্মী হওয়ার তারিখ </p>
                        <p>{userData?.workerDate}</p>
                    </div>
                    <div className="flex-1">
                        <p>সাথী হওয়ার তারিখ</p>
                        <p>{userData?.associateDate}</p>
                    </div>
                    <div className="flex-1">
                        <p>সদস্য হওয়ার তারিখ</p>
                        <p>{userData?.memberDate}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="bg-[#00b5f11f] rounded-2xl w-full flex flex-col justify-center items-center py-6">
                        <p className="text-xl flex gap-3 items-center"><span className="text-[16px]">থানার নামঃ</span> {userData?.thana}</p>
                        <p className="text-xl flex gap-3 items-center"><span className="text-[16px]">ওয়ার্ডের নামঃ</span> {userData?.ward}</p>
                        <p className="text-xl flex gap-3 items-center"><span className="text-[16px]">উপশাখার নামঃ</span> {userData?.unit}</p>
                    </div>
                    <div className="bg-[#00b5f11f] w-full rounded-2xl py-8 px-6 space-y-3 text-center">
                        {
                            userData?.responsibility.map((single, idx) =>
                                <div key={idx} className="space-y-1">
                                    <p className="text-lg"><span className="text-[16px] text-[#202020c7]">{single.area}</span>: {single.area === 'থানা' ? userData?.thana : single.area === 'ওয়ার্ড' ? userData?.ward : userData?.unit}</p>
                                    <p className="text-lg"><span className="text-[16px] text-[#202020c7]">দায়িত্বঃ </span>{single.position}</p>
                                </div>)
                        }
                    </div>
                </div>
            </div>
            <div onClick={handleUpdateState}>
                <img
                    src={edit}
                    width={50}
                    height={50}
                    className="absolute top-0 right-0 bg-[#f5f5f4] hover:bg-[#f1f1ef] active:scale-90 transition-all p-2 rounded-xl cursor-pointer"
                />
            </div>

        </div>
    );
}


export default Profile;





/**
 * {
        userData?.responsibility.map((role, idx) =>
            <button
                onClick={() => handleCng(role)}
                className="btn"
                key={idx}
            >{role.position}
            </button>
        )
    }
 * 
 * 
 * */ 