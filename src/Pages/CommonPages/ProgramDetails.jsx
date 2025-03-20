import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";
import { useParams } from "react-router";
import { CalendarCheck, Clock, MapPin, Route, UserCheck, UserMinus } from "lucide-react";

const ProgramDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams()
    console.log(id);
    const { data, isLoading } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const result = await axiosSecure.get(`/program/details/${id}`)
            return result.data
        }
    })
    console.log(data);
    if (isLoading) return <p>loading ...</p>
    const program = data?.program?.[0]

    let presents = [];
    let absents = [];

    data.users.forEach(user => {
        console.log(user);
        if (user.attendance === 'present') presents.push(user)
        else if (user.attendance === 'absent') absents.push(user)
    });

    return (
        <div className="hind mx-[5%] lg:mx-auto space-y-8">
            <p className="text-center text-3xl">{program.name}, <span className="font-medium text-cyan-500">{program.areaName + " " + program.area}</span></p>
            <div className="flex flex-col lg:flex-row justify-around">
                <div>
                    <p className="flex items-center gap-1 text-2xl font-medium my-2 underline"><Route color="#000000a6" size={25} /> প্রয়োজনীয় তথ্যঃ  </p>
                    <p className="flex items-center gap-1 text-lg"><MapPin size={19} /> {program.location}</p>
                    <p className="flex items-center gap-1 text-lg"><Clock size={19} /> {program.time}</p>
                    <p className="flex items-center gap-1 text-lg"><CalendarCheck size={19} /> {program.date}</p>
                </div>
                <div>
                    <p className="flex items-center gap-1 text-2xl font-medium my-2 underline"><Route color="#000000a6" size={25} /> উপস্থিতিঃ</p>
                    {
                        presents.length > 0 &&
                        presents.map(user => <p key={user._id} className="flex items-center gap-1 text-lg"><UserCheck size={19} /> {user.name}</p>)
                    }
                </div>
                <div>
                    <p className="flex items-center gap-1 text-2xl font-medium my-2 underline"><Route color="#000000a6" size={25} /> অনুপস্থিতি</p>
                    {
                        absents.length > 0 &&
                        absents.map(user => <p key={user._id} className="flex items-center gap-1 text-lg"><UserMinus size={19} /> {user.name}</p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProgramDetails;