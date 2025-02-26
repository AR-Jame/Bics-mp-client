import { CloudUpload, Plus, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../usehook/useAxiosPublic';
import sweet from '../../Components/Toast';
import { useQuery } from '@tanstack/react-query';
const SignUp = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [err, setErr] = useState('');
    const Toast = sweet();


    const [ward, setWard] = useState('')

    const { data: units = [] } = useQuery({
        queryKey: ['unit', ward],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wardnunit/unit?ward=${ward}`)
            return res.data
        }
    })
    const { data: wards = [] } = useQuery({
        queryKey: ['ward'],
        queryFn: async () => {
            const res = await axiosPublic.get('/wardnunit/ward')
            return res.data
        }
    })

    const [image, setImage] = useState(null);
    const [imgText, setImgText] = useState('আপনার ছবি সিলেক্ট করুন।')
    const imageRef = useRef(null);
    const [inputs, setInputs] = useState([{ area: '', position: '', id: Date.now() }]);

    const handleImage = ({ target: { files } }) => {
        if (files) {
            setImgText(files[0].name)
            setImage(URL.createObjectURL(files[0]))
        }
    }

    const handleAddOpt = () => {
        setInputs([...inputs, { area: '', position: '', id: Date.now() }])
    }

    const handleDeleteOpt = (id) => {
        setInputs((prev) => prev.filter((input) => input.id !== id));
    }

    const handleInpCng = (id, field, value) => {
        setInputs((prev) => prev.map((input) =>
            input.id === id ? field === 'area' ? { ...input, area: value } : { ...input, position: value } : input
        ))
    }


    const handleRegister = (e) => {
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

        const formData = new FormData();
        formData.append('image', form.image.files[0]);

        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('level', level);
        formData.append('thana', thana);
        formData.append('ward', ward);
        formData.append('unit', unit);
        formData.append('responsibility', JSON.stringify(responsibility));

        setErr('');
        // console.log(name, email, phone, level, thana, ward, unit, responsibility);
        if (!image) return setErr('দয়া করে আপনি আপনার একটি ইমেজ প্রদান করুন')
        if (phone.length !== 11) return setErr('দয়া করে একটি ভ্যালিড মোবাইল নাম্বার প্রদান করুন')

        let activeRole;

        for (let i = 0; i < responsibility.length; i++) {
            const role = responsibility[i];

            if (i === 0) activeRole = role;

            if (role.area === 'ওয়ার্ড' && ward === 'প্রযোজ্য নয়') {
                setErr('ওয়ার্ডের নাম প্রদান করুন');
                return
            }
            else if (role.area === 'উপশাখা' && unit === 'প্রযোজ্য নয়') {
                setErr('ইউনিটের নাম প্রদান করুন');
                return
            }
        }

        if (activeRole.area === 'থানা') activeRole = { areaName: thana, ...activeRole }
        else if (activeRole.area === 'ওয়ার্ড') activeRole = { areaName: ward, ...activeRole }
        else if (activeRole.area === 'উপশাখা') activeRole = { areaName: unit, ...activeRole }


        formData.append('activeRole', JSON.stringify(activeRole))
        console.log(activeRole);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        axiosPublic.post('/user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data.status);
                Toast.fire({ icon: 'success', title: 'আপনার রিকুয়েস্ট গ্রহণ করা হয়েছে। কনফারমেশন ইমেইল আর জন্য অপেক্ষা করুন।' })
                    && navigate('/')
            })
            .catch(err => {
                if (err.status === 502) {
                    Toast.fire({ icon: 'error', title: 'আপনার রিকুয়েস্ট গ্রহণ করা হয়নি। আপনার দেয়া ইমেইল পূর্বেই ব্যবহৃত হয়েছে।' })
                }
                else if (err.status === 501) {
                    console.log(err.response.data.message);
                    Toast.fire({
                        icon: 'error',
                        title: `${err.response.data.message.includes('Stale request') ? 'আপনার ডিভাইসের সময় ঠিক করুন।' : 'কোন সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।'}`
                    })
                }
                else {
                    Toast.fire({ icon: 'error', title: 'আপনার রিকুয়েস্ট গ্রহণ করা হয়নি। An unknown error occurred' })
                }
            })

    }

    /**
     *console.log(res.data?.error?.message)
                res.data.status === 200 && Toast.fire({ icon: 'success', title: 'আপনার রিকুয়েস্ট গ্রহণ করা হয়েছে। কনফারমেশন ইমেইল আর জন্য অপেক্ষা করুন।' }) && navigate('/')
 && navigate('/')
                res.data.status === 501 && Toast.fire({
                    icon: 'error',
                    title: `${res.data.error.message.includes('Stale request') ? 'আপনার ডিভাইসের সময় ঠিক করুন।' : 'কোন সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।'}`
                }) 
     * 
    */


    // if (isLoading || unitLoading) return <p>loading ...</p>

    return (
        <>
            <div className="flex flex-col justify-center items-center hind min-h-[80vh]">
                <p className='text-xl pb-5'>দয়া করে সঠিক তথ্য প্রদান করে রেজিস্ট্রেশন সম্পন্ন করুন</p>
                <form onSubmit={handleRegister} className="border lg:px-16 px-8 py-5 rounded-xl">
                    <div className='flex flex-col-reverse lg:flex-row justify-center items-center lg:gap-20'>
                        <div>
                            <div
                                className="h-[250px] w-[250px] flex flex-col justify-center items-center border-dashed border-4 cursor-pointer rounded-2xl"
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
                                {image ? <img src={image} className='w-[240px] h-[240px] object-contain' /> : <CloudUpload size={50} color='skyblue' />}
                            </div>
                            <p className='text-lg bg-cyan-100 my-3 p-2 border-l-8 border-cyan-300'>{imgText.length > 30 ? imgText.slice(0, 30) + '...' : imgText}</p>
                        </div>
                        <div>
                            <div className="wrapper md:w-[450px] w-full">
                                <div className="input-data">
                                    <input name='name' type="text" required />
                                    <div className="underline"></div>
                                    <label>আপনার পূর্ণ নাম *</label>
                                </div>
                                <div className="input-data">
                                    <input name='email' type="email" required />
                                    <div className="underline"></div>
                                    <label>আপনার ইমেইল অ্যাড্রেস *</label>
                                </div>
                                <div className="input-data">
                                    <input name='phone' type="number" required />
                                    <div className="underline"></div>
                                    <label>আপনার মোবাইল নাম্বার লিখুন *</label>
                                </div>
                                <div>
                                    <select name='level' className='w-full border rounded-xl p-3'>
                                        <option value="" hidden>আপনার সাংগঠনিক মান *</option>
                                        <option value="সদস্য">সদস্য</option>
                                        <option value="সাথী">সাথী</option>
                                        <option value="কর্মী">কর্মী</option>
                                    </select>
                                </div>
                                <div className='flex flex-col lg:flex-row gap-2 my-5 '>
                                    <select required name='thana' className='w-full border rounded-xl py-3 px-1'>
                                        <option value="" hidden>থানার নাম</option>
                                        <option value="মাতুয়াইল পূর্ব">মাতুয়াইল পূর্ব</option>
                                    </select>
                                    <select onChange={(e) => setWard(e.target.value)} required name='ward' className='w-full border rounded-xl py-3 px-1'>
                                        <option value="" hidden>ওয়ার্ডের নাম</option>
                                        {
                                            wards.map(ward => <option key={ward._id} value={ward.ward}>{ward.ward}</option>)
                                        }
                                        <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                                    </select>
                                </div>

                                <select required name='unit' className='w-full border rounded-xl py-3 px-1'>
                                    <option value="" hidden>উপশাখার নাম</option>
                                    {
                                        units.map(unit => <option key={unit._id} value={unit.unit}>{unit.unit}</option>
                                        )
                                    }
                                    <option value="প্রযোজ্য নয়">প্রযোজ্য নয়</option>
                                </select>

                                <div>
                                    {
                                        inputs.map((input) =>
                                            <div key={input.id} className='flex gap-3 my-5'>
                                                <select
                                                    required
                                                    value={input.area}
                                                    onChange={(e) => handleInpCng(input.id, 'area', e.target.value)}
                                                    className='w-[40%] border rounded-xl p-3'>
                                                    <option value="" hidden>পর্যায়</option>
                                                    <option value="থানা">থানা</option>
                                                    <option value="ওয়ার্ড">ওয়ার্ড</option>
                                                    <option value="উপশাখা">উপশাখা</option>
                                                </select>
                                                <select
                                                    required
                                                    value={input.position}
                                                    onChange={(e) => handleInpCng(input.id, 'position', e.target.value)}
                                                    className='w-[60%] border rounded-xl p-3'>
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
                                                    <button type='button' onClick={() => handleDeleteOpt(input.id)}><Trash2 color='white' className='bg-red-500 rounded-lg p-2 box-content' /></button>
                                                }
                                            </div>
                                        )
                                    }
                                    <div className='flex justify-end'>
                                        <button type='button' onClick={handleAddOpt} className='flex gap-2 justify-center mr-0 text-sm  px-4 border-2 border-cyan-300 py-2 rounded-lg'><Plus size={20} /> একাধিক দায়িত্ব</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button
                            className='text-center border px-3 py-2 rounded-xl border-[skyblue] hover:bg-[skyblue] hover:border-cyan-300 hover:text-white transition-all'
                            type='submit'
                        >সাবমিট করুন</button>
                    </div>
                    {err && <p className='text-red-500 text-right'>{err}!!!</p>}

                    <div className='flex justify-center'>
                        <p className="my-4">আপনি ইতিপূর্বেই রেজিস্ট্রেশন করে ফেলেছেন? <NavLink to={'/login'} className='text-orange-400 link link-underline'>লগ-ইন করুন</NavLink></p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;