import { useQuery } from "@tanstack/react-query";
import useUserContext from "../../usehook/useUserContext";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import { useState } from "react";

const CreateProgram = () => {
    const axiosSecure = useAxiosSecure();
    const { userData } = useUserContext();
    const [attendance, setAttendance] = useState({});



    const { areaName, area } = userData.activeRole;
    const { data: allUsers, isLoading } = useQuery({
        queryKey: ['user', areaName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?area=${area}&areaName=${areaName}`)
            return res.data
        }
    })

    console.log(allUsers);

    const handleAttendance = (id, status) => {

    }

    const handleProgram = (e) => {
        e.preventDefault();
    }


    if (isLoading) return <p>loading ....</p>

    return (
        <div className="flex flex-col justify-center w-full items-center hind min-h-[100vh]">
            <p className="text-2xl pb-3">একটি নতুন প্রোগ্রাম করুন</p>
            <form onSubmit={handleProgram} className="border lg:px-16 px-8 py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='name' type="text" required />
                        <div className="underline"></div>
                        <label>প্রোগ্রামের নাম লিখুন</label>
                    </div>
                    <div className="input-data">
                        <input name='location' type="text" required />
                        <div className="underline"></div>
                        <label>প্রোগ্রামের স্থান</label>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <span className="font-medium">ডেলিগেট:</span>
                        <label><input type="checkbox" name="সদস্য" id="" /> সদস্য</label>
                        <label><input type="checkbox" name="সাথী" id="" /> সাথী</label>
                        <label><input type="checkbox" name="কর্মী" id="" /> কর্মী</label>
                    </div>
                    <div className="input-data">
                        <input name='time' type="time" required />
                        <div className="underline"></div>
                        <label></label>
                    </div>
                    <div className="input-data">
                        <input name='date' type="date" required />
                        <div className="underline"></div>
                        <label></label>
                    </div>
                    <div className="h-72 overflow-y-scroll w-full ">
                        {
                            allUsers.map(user =>
                                <div key={user._id} className="flex items-center justify-between gap-5 my-2">
                                    <p>{user.name}</p>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleAttendance(user._id, 'present')} type="button" className="btn text-white text-xs btn-success">উপস্থিত</button>
                                        <button onClick={() => handleAttendance(user._id, 'absent')} type="button" className="btn text-white text-xs btn-error">অনুপস্থিত</button>
                                        <button onClick={() => handleAttendance(user._id, 'absent')} type="button" className="btn text-white text-xs btn-error">ডেলিগেট নয়</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='text-center'>
                    <button
                        className='text-center border px-3 py-2 rounded-xl border-[skyblue] hover:bg-[skyblue] hover:border-cyan-300 hover:text-white transition-all'
                        type='submit'
                    >সাবমিট করুন</button>
                </div>
            </form >
        </div >
    );
};

export default CreateProgram;