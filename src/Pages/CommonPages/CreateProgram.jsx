import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserContext from "../../usehook/useUserContext";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import { useState } from "react";

const CreateProgram = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { userData } = useUserContext();
    const [delegates, setDelegates] = useState([]);

    const [attendance, setAttendance] = useState({});
    const attendanceKey = Object.keys(attendance)

    console.log(delegates);
    console.log(attendance);

    const { areaName, area } = userData.activeRole;
    let { data: allUsers } = useQuery({
        queryKey: ['user', areaName, delegates],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?area=${area}&areaName=${areaName}&delegate=${delegates}&projection='true'`)
            return res.data
        },
        enabled: delegates.length > 0
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ body }) => {
            const res = await axiosSecure.post('/program', body);
            return res.data
        },
        onSuccess: (result, variable) => {
            variable.form.reset();
            queryClient.invalidateQueries('program')
        },
        onError: (err) => {
            console.log(err);
        }
    })


    const handleDelegate = (role) => {
        setDelegates(prev =>
            prev.includes(role) ?
                prev.filter(item => item !== role)
                :
                [...prev, role]
        )
    }

    const handleAttendance = (id, status) => {
        if (status !== 'not') {
            setAttendance(prev => ({ ...prev, [id]: status }))
        }
        else if (status === 'not') {
            allUsers = allUsers.filter(user => user._id !== id)
        }
    }

    const handleProgram = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const location = form.location.value;
        const time = form.time.value;
        const date = form.date.value;


        const body = { name, location, time, date, attendance, area, areaName }
        mutate({ body, form })
    }

    console.log('loading is', isPending);
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
                        {
                            ['সদস্য', 'সাথী', 'কর্মী'].map(role => (
                                <label className="flex gap-1" key={role}>
                                    <input
                                        type="checkbox"
                                        value={role}
                                        checked={delegates.includes(role)}
                                        onChange={() => handleDelegate(role)}
                                    />
                                    {role}
                                </label>
                            ))
                        }
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
                        {!allUsers ? <p className="h-full flex justify-center items-center text-xl">ডেলিগেট নির্বাচন করুন</p> :
                            allUsers?.map(user =>
                                <div key={user._id} className="flex items-center justify-between gap-5 my-2">
                                    <p>{user.name}</p>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleAttendance(user._id, 'present')} disabled={attendance[user._id] === 'present'} type="button" className="btn text-white text-xs"><svg width="22px" height="22px" viewBox="0 0 16.00 16.00" xmlns="http://www.w3.org/2000/svg" fill="#6ceab3" className="bi bi-person-check" stroke="#6ceab3" strokeWidth="0.656"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path><path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path></g></svg></button>
                                        <button onClick={() => handleAttendance(user._id, 'absent')} disabled={attendance[user._id] === 'absent'} type="button" className="btn text-white text-xs"><svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bi bi-person-check"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="12" cy="7" r="5" stroke="#f44e4e" strokeWidth="2.208"></circle><path d="M17 22H5.26556C4.06257 22 3.1318 20.9456 3.28101 19.7519L3.67151 16.6279C3.85917 15.1266 5.13538 14 6.64835 14H7" stroke="#f44e4e" strokeWidth="2.208" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22 19L17 14M22 14L17 19" stroke="#f44e4e" strokeWidth="2.208" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></button>
                                        <button onClick={() => handleAttendance(user._id, 'not')} disabled={attendance[user._id] === 'not'} type="button" className="btn text-white text-xs"><svg fill="#00A9E7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="-5.57 -5.57 66.84 66.84" stroke="#00A9E7" strokeWidth="1.058376" className="bi bi-circle-check"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M27.852,0C19.905,0,12.743,3.363,7.664,8.72C7.628,8.751,7.583,8.762,7.549,8.796C7.495,8.85,7.476,8.922,7.426,8.98C2.833,13.949,0,20.568,0,27.852c0,15.357,12.493,27.851,27.851,27.851c15.356,0,27.851-12.494,27.851-27.851C55.703,12.494,43.208,0,27.852,0z M4.489,27.851c0-5.315,1.805-10.207,4.806-14.138l32.691,32.694c-3.93,3.001-8.819,4.806-14.135,4.806C14.969,51.213,4.489,40.732,4.489,27.851z M45.282,43.352l-32.933-32.93c4.13-3.678,9.551-5.934,15.503-5.934c12.881,0,23.362,10.48,23.362,23.363C51.213,33.803,48.958,39.225,45.282,43.352z"></path></g></svg></button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='text-center'>
                    <button
                        className={`btn text-center border px-3 py-2 rounded-xl border-[skyblue] hover:bg-[skyblue] hover:border-cyan-300 hover:text-white transition-all`}
                        type='submit'
                        disabled={attendanceKey.length !== allUsers?.length || isPending}
                    >{isPending ? <><span className="loading"></span>loading</> : "সাবমিট করুন"}</button>
                </div>
            </form >
        </div >
    );
};

export default CreateProgram;

