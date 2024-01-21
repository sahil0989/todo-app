import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth, googleAuth } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuth)
            navigate("/home")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <div className="grid h-screen place-content-center bg-white px-4">
                <div className="text-center border-2 rounded-lg bg-slate-100 px-8 py-5 hover:cursor-pointer" onClick={loginWithGoogle}>
                    <div className='flex items-center gap-10'>
                        <FcGoogle className='scale-[250%]' />
                        <h3> Login with Googggllliiee</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}