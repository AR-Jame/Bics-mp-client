import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../usehook/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Alert from "../../Components/Toast";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../usehook/useAxiosPublic";

const Login = () => {
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();
    const { login, logOut } = useAuth();
    const [show, setShow] = useState(true);
    const navigate = useNavigate()
    const Toast = Alert();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        const status = await queryClient.fetchQuery({
            queryKey: ['user', email],
            queryFn: async () => {
                const response = await axiosPublic.get(`/user/accept-req/${email}`)
                console.log(response.data);
                return response.data.status;
            },
        })

        if (status !== 'user') {
            Toast.fire({
                icon: 'error',
                title: 'আপনি আমাদের রেজিস্টার্ড ইউজার না। তাই আপনাকে অনুমতি দেয়া যাচ্ছে না'
            })
            return
        }
        login(email, password)
            .then((result) => {
                console.log(result);
                navigate('/')
                if (!result.user.emailVerified) {
                    // TODO: i have to uncomment this for email verification
                    // logOut()
                    // Toast.fire({
                    //     icon: 'warning',
                    //     title: 'দয়া করে আপনার ইমেইল ভ্যারিফাই করুন'
                    // })
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col justify-center items-center hind min-h-[70vh]">
            <p className="text-2xl pb-3">Welcome back, Dear User!</p>
            <form onSubmit={handleSubmit} className="border lg:px-16 px-8 py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='email' type="email" required />
                        <div className="underline"></div>
                        <label>আপনার ইমেইল অ্যাড্রেস</label>
                    </div>
                    <div className="input-data relative">
                        <input name='password' type={show ? 'password' : 'text'} required />
                        <span onClick={() => setShow(!show)} className="absolute right-2 top-2 text-[gray]">{show ? <EyeOff /> : <Eye />}</span>
                        <div className="underline"></div>
                        <label>আপনার পাসওয়ার্ড</label>
                        <div className="flex justify-end">
                            <span className="py-4 link link-hover">Forget Password</span>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <button
                        className='text-center border px-3 py-2 rounded-xl border-[skyblue] hover:bg-[skyblue] hover:border-cyan-300 hover:text-white transition-all'
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

export default Login;