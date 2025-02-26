import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import PropTypes from "prop-types";
import useAxiosPublic from "../usehook/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app)

    const axiosPublic = useAxiosPublic();

    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const emailVerify = () => {
        sendEmailVerification(auth.currentUser);
    }

    const updateUser = (imageURL) => {
        return updateProfile(auth.currentUser, {
            photoURL: imageURL,
        })
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUSer) => {
            setUser(currentUSer);
            if (currentUSer) {

                const res = await axiosPublic.post(
                    '/jwt',
                    currentUSer.email,
                    { withCredentials: true },
                )
                console.log(res.data);

            }
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    }, [auth, axiosPublic])

    const authInfo = {
        signUp,
        login,
        logOut,
        emailVerify,
        updateUser,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node
};
export default AuthProvider;