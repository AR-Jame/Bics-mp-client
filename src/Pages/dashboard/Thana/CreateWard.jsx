import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../usehook/useAxiosPublic";

const CreateWard = () => {
    const axiosPublic = useAxiosPublic()
    const queryClient = useQueryClient();


    const { mutate } = useMutation({
        mutationFn: async (data) => {
            console.log(data);
            await axiosPublic.post('/wardnunit/ward', data)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('wardnunit')
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleCreate = (e) => {
        e.preventDefault();
        const thana = e.target.thana.value;
        const ward = e.target.ward.value

        mutate({ thana, ward });
    }
    return (
        <div className="flex flex-col justify-center items-center hind min-h-[70vh]">
            <p className="text-2xl pb-3">নতুন ওয়ার্ড তৈরি করুন</p>
            <form onSubmit={handleCreate} className="border  lg:px-16 px-8 py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='ward' type="text" required />
                        <div className="underline"></div>
                        <label>ওয়ার্ডের নাম লিখুন</label>
                    </div>
                    <select required name='thana' className='w-full border rounded-xl py-3 px-1'>
                        <option value="" hidden>থানার নাম</option>
                        <option value="মাতুয়াইল পূর্ব">মাতুয়াইল পূর্ব</option>
                    </select>
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

export default CreateWard;