import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../usehook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../usehook/useAxiosPublic";
import Alert from "../../Components/Toast";

const AcceptReq = () => {
    const [show, setShow] = useState(true);
    const [err, setErr] = useState('');
    const { signUp, updateUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const Toast = Alert();
    const navigate = useNavigate();


    const handleAccept = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirmPass.value;
        console.log(email, password, confirmPass);
        setErr('')

        if (password !== confirmPass) return setErr('পাসওয়ার্ড কনফার্ম করুন');
        if (password.length < 6) return setErr('সর্বনিম্ন ৬টি অক্ষর ব্যবহার করতে হবে');

        const userData = await queryClient.fetchQuery({
            queryKey: ['user', email],
            queryFn: async () => {
                const response = await axiosPublic.get(`/user/accept-req/${email}`)
                console.log(response.data);
                return response.data;
            },
        })

        if (userData.status === 'ok') {
            const signUpRes = await signUp(email, password)
            // TODO: i have to write code for email verification
            await updateUser(userData.imageURL)
            console.log(signUpRes);
            if (signUpRes.user.email) {
                const result = await axiosPublic.put(`/user/accept-req-email/${signUpRes.user.email}`)
                console.log(result, 'res is')
                navigate('/')
            }

        }
        else if (userData.status === 'not') {
            Toast.fire({
                icon: 'warning',
                title: 'আপনার সম্ভবত রেজিস্ট্রেশন করেননি। দয়া করে প্রথমে রেজিস্ট্রেশন করুন। অতঃপর কনফারমেশন ইমেইল এর জন্য অপেক্ষা করুন। ধন্যবাদ'
            })
        }
        else if (userData.status === 'pending') {
            Toast.fire({
                icon: 'warning',
                title: 'আপনার রিকুয়েস্ট পেন্ডিং রয়েছে। কনফারমেশন ইমেইল এর জন্য অপেক্ষা করুন। ধন্যবাদ'
            })
        }
        else if (userData.status === 'user') {
            Toast.fire({
                icon: 'warning',
                title: 'আপনার রিকুয়েস্ট ইতিপূর্বেই গ্রহণ করা হয়েছে। পুনরায় গ্রহণ করা হবে না। দয়া করে লগ ইন করুন। '
            })
        }
        else {
            Toast.fire({
                icon: 'error',
                title: "We don't understand what is the problem"
            })
        }
    }
    return (
        <div className="flex flex-col justify-center items-center hind min-h-[70vh]">
            <p className="text-2xl pb-3">Welcome back, Dear User!</p>
            <form onSubmit={handleAccept} className="border lg:px-16 px-8 py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='email' type="email" required />
                        <div className="underline"></div>
                        <label>আপনার ইমেইল অ্যাড্রেস <sup className="text-xs text-[#2e2e2ed3]">(যেটি রেজিস্ট্রেশনে ব্যবহার করেছেন।)</sup></label>
                    </div>
                    <div className="input-data relative">
                        <input name='password' type={show ? 'password' : 'text'} required />
                        <span onClick={() => setShow(!show)} className="absolute right-2 top-2 text-[gray]">{show ? <EyeOff /> : <Eye />}</span>
                        <div className="underline"></div>
                        <label>আপনার পাসওয়ার্ড</label>
                    </div>
                    <div className="input-data relative">
                        <input name='confirmPass' type={show ? 'password' : 'text'} required />
                        <span onClick={() => setShow(!show)} className="absolute right-2 top-2 text-[gray]">{show ? <EyeOff /> : <Eye />}</span>
                        <div className="underline"></div>
                        <label>পাসওয়ার্ড কনফার্ম করুন</label>
                    </div>
                </div>

                {
                    err && <p className="text-red-500 text-right">{err}</p>
                }

                <div className='text-center'>
                    <button
                        className='btn btn-info text-white font-normal'
                        type='submit'
                    >সাবমিট করুন</button>
                </div>
                <div>
                    <p className=" my-4">আপনি এখনো রেজিস্ট্রেশন করেননি? <NavLink to={'/sign-up'} className='text-orange-400 link link-underline'>রেজিস্ট্রেশন করুন</NavLink> </p>
                </div>
            </form>
        </div>
    );
};

export default AcceptReq;