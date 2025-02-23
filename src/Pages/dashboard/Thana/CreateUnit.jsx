import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../usehook/useAxiosPublic";

const CreateUnit = () => {
    const axiosPublic = useAxiosPublic()
    const queryClient = useQueryClient();

    const { data: allWard = [], isLoading } = useQuery({
        queryKey: ['wardnunit'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wardnunit/ward`)
            return res.data;
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (data) => {
            console.log(data);
            await axiosPublic.post('/wardnunit/unit', data)
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
        const unit = e.target.unit.value

        mutate({ thana, ward, unit });
    }

    console.log(allWard);
    if (isLoading) return <p>loading ...</p>

    return (
        <div className="flex flex-col justify-center items-center hind min-h-[70vh]">
            <p className="text-2xl pb-3">নতুন উপশাখা তৈরি করুন</p>
            <form onSubmit={handleCreate} className="border  lg:px-16 px-8 py-5 rounded-xl">
                <div className="wrapper md:w-[450px] w-full">
                    <div className="input-data">
                        <input name='unit' type="text" required />
                        <div className="underline"></div>
                        <label>উপশাখার নাম লিখুন</label>
                    </div>
                    <select required name='ward' className='w-full mb-4 border rounded-xl py-3 px-1'>
                        <option value="" hidden>ওয়ার্ডের নাম</option>
                        {
                            allWard.map(ward => <option key={ward._id} value={ward.ward}>{ward.ward}</option>)
                        }
                    </select>
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

export default CreateUnit;