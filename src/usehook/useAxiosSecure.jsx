import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_baseURl,
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        const interceptorId = axiosSecure.interceptors.response.use((res) => {
            return res
        },
            (error) => {
                console.log('error is', error);
                if (error.status === 401 || error.status === 403) {
                    logOut()
                        .then(() => {
                            navigate('/')
                        })
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosSecure.interceptors.request.eject(interceptorId);
        }
    }, [logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;