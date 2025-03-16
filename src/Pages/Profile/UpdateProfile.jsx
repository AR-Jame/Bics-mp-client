import { CloudUpload, Plus, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useWard from "../../usehook/useWard";
import useUnit from "../../usehook/useUnit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../usehook/useAxiosSecure";


const UpdateProfile = ({ userData, setUpdateProfile }) => {
    const imageRef = useRef(null);
    const [inputs, setInputs] = useState(userData?.responsibility)
    const [err, setErr] = useState('');
    const [image, setImage] = useState(userData?.image);
    const [ward, setWard] = useState(null)

    const wards = useWard();
    const units = useUnit(ward);
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const { mutate } = useMutation({
        mutationFn: (formData) => {
            axiosSecure.put(`/user/profile/${userData?.email}`, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('profile', userData?.email)
            setUpdateProfile(false)
        },
        onError: (err) => {
            console.log(err.data);
            setErr(err.data.message)
        }
    })


    const handleImage = ({ target: { files } }) => {
        if (files) {
            setImage(URL.createObjectURL(files[0]))
        }
    }
    const handleAddOpt = () => {
        setInputs([...inputs, { area: '', position: '', id: Date.now() }])
    }
    const handleInpCng = (id, field, value) => {
        setInputs((prev) => prev.map((input) =>
            input.id === id ? field === 'area' ? { ...input, area: value } : { ...input, position: value } : input
        ))
    }
    const handleDeleteOpt = (id) => {
        setInputs((prev) => prev.filter((input) => input.id !== id));
    }
    const handleStateCng = () => {
        setUpdateProfile(false)
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const level = form.level.value;
        const thana = form.thana.value;
        const ward = form.ward.value;
        const unit = form.unit.value;
        const responsibility = inputs;
        const institutionName = form.institutionName.value;
        const batch = form.batch.value;
        const group = form.group.value;
        const workerDate = form.workerDate.value;
        const associateDate = form.associateDate.value;
        const memberDate = form.memberDate.value;

        const formData = new FormData();
        if (image !== userData?.image) {
            formData.append('image', form.image.files[0]);
        }

        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('level', level);
        formData.append('institutionName', institutionName)
        formData.append('batch', batch)
        formData.append('group', group)
        formData.append('workerDate', workerDate)
        formData.append('associateDate', associateDate)
        formData.append('memberDate', memberDate)
        formData.append('thana', thana);
        formData.append('ward', ward);
        formData.append('unit', unit);
        formData.append('responsibility', JSON.stringify(responsibility));

        mutate(formData)
    }


    console.log('form', userData);
    return (
        <form onSubmit={handleUpdateProfile} className="hind mx-[5%] xl:mx-[10%] space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center" >
                <div className="space-y-4 mt-5">
                    <div className="bg-[#00b5f11f] rounded-2xl py-8 text-center space-y-7">
                        <div
                            className="h-[250px] w-[250px] rounded-full mx-auto flex flex-col justify-center items-center border-dashed border-4 cursor-pointer"
                            onClick={() => imageRef.current.click()}
                        >
                            <input
                                type="file"
                                name="image"
                                className="inpImg"
                                hidden
                                ref={imageRef}
                                onChange={handleImage}
                            />
                            {image ? <img src={image} className='w-[240px] h-[240px] rounded-full object-contain' /> : <CloudUpload size={50} color='skyblue' />}
                        </div>
                        <div className="space-y-2 flex flex-col items-center">
                            <input placeholder="আপনার নাম লিখুন" className='input' type="text" name="name" defaultValue={userData?.name} />
                            <input placeholder="আপনার মোবাইল নাম্বার লিখুন" className='input' type="number" name="phone" defaultValue={userData?.phone} />
                            <input className='input' type="email" name="email" disabled defaultValue={userData?.email} />
                            <select name='level' className='select' defaultValue={userData?.level}>
                                <option value="" hidden>আপনার সাংগঠনিক মান</option>
                                <option value="সদস্য">সদস্য</option>
                                <option value="সাথী">সাথী</option>
                                <option value="কর্মী">কর্মী</option>
                            </select>
                        </div>
                    </div>
                    <div className="bg-[#00b5f11f] rounded-2xl py-8 space-y-2 px-4 flex flex-col items-center">
                        <input placeholder="শিক্ষাপ্রতিষ্ঠানের নাম" className='input' type="text" name="institutionName" defaultValue={userData?.institutionName} />
                        <select name="batch" className="select" defaultValue={userData?.batch}>
                            <option value="" hidden>শ্রেণি</option>
                            {
                                ["চতুর্থ", "পঞ্চম", "ষষ্ঠ", "সপ্তম", "অষ্টম", "নবম", "দশম", "একাদশ", "দ্বাদশ", "অনার্স/ফাজিল", "মাস্টার্স/কামিল"].map((item, idx) => <option key={idx} value={item}>{item}</option>)
                            }
                        </select>
                        <select name="group" className="select">
                            <option value="" hidden>বিভাগ</option>
                            {
                                ['বিজ্ঞান', 'মানবিক', 'ব্যবসায় শিক্ষা', 'প্রযোজ্য নয়'].map((item, idx) => <option key={idx} value={item}>{item}</option>)
                            }
                        </select>
                    </div>

                </div>
                <div className="space-y-4 mt-5">
                    <div className="bg-[#00b5f11f] rounded-2xl py-8 px-6 flex flex-col lg:flex-row gap-3">
                        <div className="flex-1">
                            <p>কর্মী হওয়ার তারিখ </p>
                            <input type="date" className="input" name="workerDate" defaultValue={userData?.workerDate} />
                        </div>
                        <div className="flex-1">
                            <p>সাথী হওয়ার তারিখ</p>
                            <input type="date" className="input" name="associateDate" defaultValue={userData?.associateDate} />
                        </div>
                        <div className="flex-1">
                            <p>সদস্য হওয়ার তারিখ</p>
                            <input type="date" className="input" name="memberDate" defaultValue={userData?.memberDate} />
                        </div>
                    </div>
                    <div className="bg-[#00b5f11f] rounded-2xl py-8 px-6 flex flex-col items-center space-y-2">
                        <input className="input" placeholder="থানার নাম" name="thana" defaultValue={userData?.thana} type="text" />
                        <select
                            onChange={(e) => setWard(e.target.value)}
                            required
                            name='ward'
                            defaultValue={userData.ward}
                            className='select'>
                            <option value="" hidden>ওয়ার্ডের নাম</option>
                            {
                                wards.map(ward => <option key={ward._id} value={ward.ward}>{ward.ward}</option>)
                            }
                            <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                        </select>
                        <select
                            required
                            name='unit'
                            className='select'
                            defaultValue={userData?.unit}
                        >
                            <option value="" hidden>উপশাখার নাম</option>
                            {
                                units.map(unit => <option key={unit._id} value={unit.unit}>{unit.unit}</option>
                                )
                            }
                            <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                        </select>
                    </div>
                    <div className="bg-[#00b5f11f] rounded-2xl py-8 px-6 space-y-3 text-center">
                        <div className="max-w-[500px] mx-auto">
                            {
                                inputs.map((input) =>
                                    <div key={input.id} className='flex gap-3 my-5'>
                                        <select
                                            required
                                            value={input.area}
                                            onChange={(e) => handleInpCng(input.id, 'area', e.target.value)}
                                            className='w-[40%] select'>
                                            <option value="" hidden>পর্যায়</option>
                                            <option value="থানা">থানা</option>
                                            <option value="ওয়ার্ড">ওয়ার্ড</option>
                                            <option value="উপশাখা">উপশাখা</option>
                                        </select>
                                        <select
                                            required
                                            value={input.position}
                                            onChange={(e) => handleInpCng(input.id, 'position', e.target.value)}
                                            className='w-[60%] select'>
                                            <option value="" hidden >দায়িত্ব</option>
                                            <option value="সভাপতি">সভাপতি</option>
                                            <option value="সেক্রেটারি">সেক্রেটারি</option>
                                            <option value="সাংগঠনিক সম্পাদক">সাংগঠনিক সম্পাদক</option>
                                            <option value="বায়তুলমাল সম্পাদক">বায়তুলমাল সম্পাদক</option>
                                            <option value="সাহিত্য সম্পাদক">সাহিত্য সম্পাদক</option>
                                            <option value="অফিস সম্পাদক">অফিস সম্পাদক</option>
                                            <option value="ছাত্রকল্যাণ সম্পাদক">ছাত্রকল্যাণ সম্পাদক</option>
                                            <option value="ছাত্রকল্যাণ সম্পাদক">এইচআরডি সম্পাদক</option>
                                            <option value="ক্রীড়া সম্পাদক">ক্রীড়া সম্পাদক</option>
                                            <option value="সহকারী বায়তুলমাল সম্পাদক">সহকারী বায়তুলমাল সম্পাদক</option>
                                            <option value="সহকারী সাহিত্য সম্পাদক">সহকারী সাহিত্য সম্পাদক</option>
                                            <option value="সহকারী অফিস সম্পাদক">সহকারী অফিস সম্পাদক</option>
                                            <option value="সহকারী ছাত্রকল্যাণ সম্পাদক">সহকারী ছাত্রকল্যাণ সম্পাদক</option>
                                            <option value="সহকারী ছাত্রকল্যাণ সম্পাদক">সহকারী এইচআরডি সম্পাদক</option>
                                            <option value="দায়িত্ব নেই">দায়িত্ব নেই</option>
                                        </select>
                                        {
                                            inputs.length !== 1 &&
                                            <button type='button' className='cursor-pointer btn btn-error px-2' onClick={() => handleDeleteOpt(input.id)}><Trash2 color='white' /></button>
                                        }
                                    </div>
                                )
                            }
                            <div className='flex justify-end'>
                                <button type='button' onClick={handleAddOpt} className='btn btn-info text-white font-medium'><Plus size={20} /> একাধিক দায়িত্ব</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center space-x-2 w-full'>
                <button type='submit' className='btn btn-success text-white font-medium' >সাবমিট করুন</button>
                <button onClick={handleStateCng} type="button" className='btn btn-warning font-medium text-white'>ডিসকার্ড</button>
            </div>
            {err && <p className='text-red-500 text-right'>{err}!!!</p>}
        </form>
    );
};

UpdateProfile.propTypes = {
    userData: PropTypes.object,
    user: PropTypes.object,
    setUpdateProfile: PropTypes.func
}

export default UpdateProfile;