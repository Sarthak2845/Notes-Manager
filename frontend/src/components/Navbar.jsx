import { LogInIcon, NotebookIcon } from 'lucide-react'
import { useState } from 'react';
import { authAPI } from "../api";
import { useNavigate } from 'react-router';
import React from 'react'
import Popup from './Popup';

const Navbar = () => {
    const [popup, setPopup] = useState({ isVisible: false, type: "error", message: "" });
    const navigate = useNavigate();

    const handelLogout = async () => {
        try {
            await authAPI.logout()
            setPopup({
                isVisible: true,
                type: "success",
                message: "Logout successful!"
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setPopup({
                isVisible: true,
                type: "error",
                message: error.response?.data?.message || "Invalid credentials"
            });
        }
    }
    return (
        <nav className="bg-[#4FB7B3] fixed w-full top-0 left-0 z-50 border-b-2 text-[#2b2822]">
            <div className="mx-auto max-w-screen-xl w-full flex items-center justify-between py-2 px-4">
                <div
                    className="flex items-center text-2xl font-bold text-black cursor-pointer"
                >
                    <NotebookIcon size={32} className="inline-block  m-2" />
                    My Notes
                </div>
                <button onClick={handelLogout} className="bg-red-500 px-2 py-1 rounded-lg transition-colors hover:bg-red-700 cursor-pointer">
                    <LogInIcon className='inline mr-2' />
                    Logout
                </button>
            </div>
            <Popup
                isVisible={popup.isVisible}
                onClose={() => setPopup({ ...popup, isVisible: false })}
                type={popup.type}
                message={popup.message}
            />
        </nav>
    )
}

export default Navbar
