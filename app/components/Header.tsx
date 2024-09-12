'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import userprofile from '../assets/userprofile.png';


const Header = () => {
    const session = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        if (session.status==="authenticated") {
            console.log('Authenticated')
            //console.log(session?.data?.user);
        }
    }, [session]);
    const navigateToHome=()=>{
        // navigate to home page
        window.location.href = '/';
    }
    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-green-600">
            <h1 className="cursor-pointer text-white text-2xl font-bold" onClick={()=>navigateToHome()}>Injury Tracker</h1>
            {session?.data?.user ? (
                <div className="relative flex items-center">
                    <p className="mr-4">{session.data.user.name}</p>
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={userprofile.src}
                        />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-10 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                            <button
                                onClick={() => signOut()}
                                className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => signIn()}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Sign In
                </button>
            )}
        </header>
    )
}

export default Header;