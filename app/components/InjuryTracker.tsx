'use client'
import { useRouter } from "next/navigation";

const InjuryTracker = () => {
    const route=useRouter();
    const handleRoute=()=>{
        route.push('/registerinjury');
    }

    const handleDatabaseRoute=()=>{
        route.push('/injurydata')
    }

    return (
        <main className="flex items-center justify-center flex-grow">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-md m-4 hover:bg-blue-600 focus:outline-none" onClick={handleRoute}>
                Register Injury
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-md m-4 hover:bg-blue-600 focus:outline-none" onClick={handleDatabaseRoute}>
                Injury Database
            </button>
        </main>
    );
};

export default InjuryTracker;
