import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../usehook/useAxiosPublic";

const UpdateWisher = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['wisherDetail', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wisher/${id}`)
            return res.data
        }
    })


    const { mutate, } = useMutation({
        mutationFn: async (updatedDoc) => {
            await axiosPublic.put(`/wisher/update/${id}`, updatedDoc);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('wisher')
        },
        onError: (error) => {
            console.log(error);
        }
    })


    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const amount = form.amount.value;
        const thana = form.thana.value;
        const ward = form.ward.value;
        const unit = form.unit.value;

        mutate({ name, phone, location, amount, thana, ward, unit })
    }
    if (isLoading) return <p>loading......</p>

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-full hind min-h-[100vh]">
                <p className="text-2xl pb-3">শুভাকাঙ্ক্ষীর তথ্য পরিবর্তন করুন</p>
                <form onSubmit={handleUpdate} className="border lg:px-16 px-2 py-10 rounded-xl w-full md:w-[550px]">
                    <div className="wrapper">
                        <div className="input-data">
                            <input defaultValue={data.name} name='name' type="text" required />
                            <div className="underline"></div>
                            <label>শুভাকাঙ্ক্ষীর নাম লিখুন</label>
                        </div>
                        <div className="input-data">
                            <input defaultValue={data.phone} name='phone' type="number" required />
                            <div className="underline"></div>
                            <label>শুভাকাঙ্ক্ষীর ফোন নাম্বার লিখুন</label>
                        </div>
                        <div className="input-data">
                            <input defaultValue={data.location} name='location' type="text" required />
                            <div className="underline"></div>
                            <label>শুভাকাঙ্ক্ষীর ঠিকানা লিখুন</label>
                        </div>
                        <div className="input-data">
                            <input defaultValue={data.amount} name='amount' type="number" required />
                            <div className="underline"></div>
                            <label>এয়ানতের পরিমান লিখুন</label>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-2 my-5 '>
                            <select defaultValue={data.thana} required name='thana' className='w-full border rounded-xl py-3 px-1'>
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
        </div>
    );
};

export default UpdateWisher;