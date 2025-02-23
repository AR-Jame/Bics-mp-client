import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../usehook/useAxiosPublic";

const AddWisher = () => {

    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async (wisher) => {
            console.log('wisher is ', wisher);
            const res = axiosPublic.post('/wisher', wisher)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wisher'])
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
        <div className="flex flex-col justify-center w-full items-center hind min-h-[100vh]">
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
                    <div className='flex flex-col lg:flex-row gap-2 my-5 '>
                        <select required name='thana' className='w-full border rounded-xl py-3 px-1'>
                            <option value="" hidden>থানার নাম</option>
                            <option value="মাতুয়াইল পূর্ব">মাতুয়াইল পূর্ব</option>
                        </select>
                        <select required name='ward' className='w-full border rounded-xl py-3 px-1'>
                            <option value="" hidden>ওয়ার্ডের নাম</option>
                            <option value="সদস্য">সদস্য</option>
                            <option value="সাথী">সাথী</option>
                            <option value="">প্রযোজ্য নয়</option>
                        </select>
                        <select required name='unit' className='w-full border rounded-xl py-3 px-1'>
                            <option value="" hidden>উপশাখার নাম</option>
                            <option value="সদস্য">সদস্য</option>
                            <option value="সাথী">সাথী</option>
                            <option value="কর্মী">প্রযোজ্য নয়</option>
                        </select>
                    </div>
                </div>
                <div className='text-center'>
                    <button
                        className='text-center border px-3 py-2 rounded-xl border-[skyblue] hover:bg-[skyblue] hover:border-cyan-300 hover:text-white transition-all'
                        type='submit'
                    >সাবমিট করুন</button>
                </div>
            </form>
        </div>
    );
};

export default AddWisher;