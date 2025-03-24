import useAxiosPublic from "../../usehook/useAxiosPublic";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserContext from "../../usehook/useUserContext";
import { Plus } from "lucide-react";

const Wisher = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient()
    const { userData } = useUserContext();
    const { area, areaName } = userData.activeRole;


    const { mutate } = useMutation({
        mutationFn: async (_id, month) => {
            const res = await axiosPublic.put(`/wisher/${_id}`, { month })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wisher'])
        }
    })

    const { data = [], isLoading } = useQuery({
        queryKey: ['wisher'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wisher?area=${area}&areaName=${areaName}`)
            return res.data
        }
    });
    console.log(data);
    if (isLoading) return <p>loading......</p>

    return (
        <div className="hind mx-[5%] lg:mx-auto relative min-h-screen">
            <p className="text-xl lg:text-2xl text-center mt-4 mb-10">শুভাকাঙ্ক্ষী তালিকা, <span className="text-cyan-400 font-medium">{userData.activeRole.areaName} {userData.activeRole.area}</span></p>
            <div className="flex flex-wrap gap-4">
                {
                    data.map((single) =>
                        <div key={single._id} className={`bg-white w-full lg:w-[400px] border-l-8 shadow-md ${single.currentPayment.status === 'paid' ? 'border-l-green-400' : 'border-l-red-400'}  p-5 flex justify-between items-center`}>
                            <div>
                                <NavLink to={`/dashboard/wisher/${single._id}`} className="text-xl font-medium active:border-b">{single.name}</NavLink>
                                <p className="mt-2">{single.phone}</p>
                            </div>
                            <div>

                                {
                                    single.currentPayment.status === 'unpaid' ?
                                        <button onClick={() => mutate(single._id)} className="btn btn-info btn-md text-white">পে</button>
                                        :
                                        <p>{single.currentPayment.paidAt}</p>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <NavLink to='/dashboard/create-wisher'>
                <button type="button" className="btn btn-circle btn-md btn-info fixed bottom-12 right-[45%]"><Plus color="white" /></button>
            </NavLink>
        </div>
    );
};

export default Wisher;
{/* <ul className="w-full list  table">
                {
                    data.map((single, idx) => <WisherCard key={single._id} idx={idx + 1} data={single} />)
                }
            </ul> */}


// <NavLink to='/dashboard/create-wisher'>
//     <button className="btn">Create new wisher</button>
// </NavLink>