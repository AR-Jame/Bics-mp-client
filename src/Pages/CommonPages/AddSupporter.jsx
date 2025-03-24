import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import { useState } from "react";
import useWard from "../../usehook/useWard";
import useUnit from "../../usehook/useUnit";
import { useNavigate } from "react-router";

const AddSupporter = () => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()
    const [ward, setWard] = useState(null);
    const navigate = useNavigate();
    const wards = useWard();
    console.log(ward);
    const units = useUnit(ward);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            await axiosSecure.post('/supporter', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('supporter');
            navigate('/dashboard/supporter')
        }

    })

    const handleSupporter = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const thana = form.thana.value;
        const ward = form.ward.value;
        const unit = form.unit.value;
        const data = { name, phone, location, thana, ward, unit };
        mutate(data)
    }


    return (
        <div className="flex flex-col justify-center items-center hind min-h-[80vh] mx-[5%] lg:mx-auto">
            <p className="text-2xl pb-3">নতুন সমর্থক যুক্ত করুন</p>
            <form onSubmit={handleSupporter} className="border lg:px-16 w-full lg:w-auto py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='name' type="text" required />
                        <div className="underline"></div>
                        <label>সমর্থকের নাম লিখুন</label>
                    </div>
                    <div className="input-data">
                        <input name='phone' type="number" required />
                        <div className="underline"></div>
                        <label>সমর্থকের ফোন নাম্বার লিখুন</label>
                    </div>
                    <div className="input-data">
                        <input name='location' type="text" required />
                        <div className="underline"></div>
                        <label>সমর্থকের ঠিকানা লিখুন</label>
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

export default AddSupporter;