import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import useWard from "../../usehook/useWard";
import { useState } from "react";
import useUnit from "../../usehook/useUnit";
import { useNavigate } from "react-router";

const AddWisher = () => {

    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()
    const [ward, setWard] = useState(null);
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const wards = useWard();
    console.log(ward);
    const units = useUnit(ward);

    const { mutate, isPending } = useMutation({
        mutationFn: async (wisher) => {
            console.log('wisher is ', wisher);
            axiosSecure.post('/wisher', wisher)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wisher'])
            navigate('/dashboard/wisher')
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const amount = form.amount.value;
        const thana = form.thana.value;
        const ward = form.ward.value;
        const unit = form.unit.value;

        setErr('')

        // TODO: i have to check the phone number
        // if(phone.length !== 11) return setErr('দয়া করে একটি ভ্যালিড নাম্বার প্রদান করুন।')

        // inserting current payment
        const currentMonth = new Date().toISOString().slice(0, 7);
        const newPayment = {
            month: currentMonth,
            amount: amount,
            status: 'unpaid',
            paidAt: ''
        }
        const payments = [newPayment];


        mutate({ name, phone, location, amount, thana, ward, unit, payments })
    }
    return (
        <div className="flex flex-col justify-center w-full items-center hind min-h-[80vh]">
            <p className="text-2xl pb-3">নতুন শুভাকাঙ্ক্ষী যুক্ত করুন</p>
            <form onSubmit={handleSubmit} className="border lg:px-16 px-8 py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='name' type="text" required />
                        <div className="underline"></div>
                        <label>শুভাকাঙ্ক্ষীর নাম লিখুন</label>
                    </div>
                    <div className="input-data">
                        <input name='phone' type="number" required />
                        <div className="underline"></div>
                        <label>শুভাকাঙ্ক্ষীর ফোন নাম্বার লিখুন</label>
                    </div>
                    <div className="input-data">
                        <input name='location' type="text" required />
                        <div className="underline"></div>
                        <label>শুভাকাঙ্ক্ষীর ঠিকানা লিখুন</label>
                    </div>
                    <div className="input-data">
                        <input name='amount' type="number" required />
                        <div className="underline"></div>
                        <label>এয়ানতের পরিমান লিখুন</label>
                    </div>
                    <select required name='thana' className='w-full border rounded-xl py-3 px-1'>
                        <option value="" hidden>থানার নাম</option>
                        <option value="মাতুয়াইল পূর্ব">মাতুয়াইল পূর্ব</option>
                    </select>
                    <div className='flex flex-col lg:flex-row gap-2 my-5 '>
                        <select required name='ward' onClick={(e) => setWard(e.target.value)} className='w-full border rounded-xl py-3 px-1'>
                            <option value="" hidden>ওয়ার্ডের নাম</option>
                            {
                                wards.map(ward => <option key={ward._id}>{ward.ward}</option>)
                            }
                            <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                        </select>
                        <select required name='unit' className='w-full border rounded-xl py-3 px-1'>
                            <option value="" hidden>উপশাখার নাম</option>
                            {
                                units.map(unit => <option key={unit._id}>{unit.unit}</option>)
                            }
                            <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                        </select>
                    </div>
                    {err && <p className="text-red-500">{err}</p>}
                </div>
                <div className='text-center'>
                    {isPending ?
                        <p className="btn">
                            <span className="loading loading-spinner"></span>
                            loading
                        </p>
                        :
                        <button className='btn btn-info text-white' type='submit'
                        >সাবমিট করুন</button>
                    }
                </div>
            </form>
        </div>
    );
};

export default AddWisher;