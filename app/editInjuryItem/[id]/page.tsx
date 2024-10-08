'use client'
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import BodyMap from "../../components/bodymap";
import { useRouter } from "next/navigation";

export type pointsProps = {
    x: number,
    y: number
}

export type InjuryDescriptionProps = {
    xPos: number,
    yPos: number
    bodyPart: string,
    description: string
}



const EditInjuryItem = ({ params }: { params: { id: string } }) => {
    const router=useRouter();
    const { id } = params;
    const [reporter, setReporter] = useState<string>();
    const [dateOfIncident, setDateOfIncident] = useState<string>();
    const [dateOfReporting, setDateofReporting] = useState<string>();
    const [timeOfIncident, setTimeOfIncident] = useState<string>();
    const [timeOfReporting, setTimeOfReporting] = useState<string>();
    const [points, setPoints] = useState<pointsProps[]>([]);
    const [injuryArray, setInjuryArray] = useState<InjuryDescriptionProps[]>([])
    const context = useContext(AuthContext);
    const [isEditable, setisEditable] = useState<boolean>(false)



    useEffect(() => {
        
        // if(!context?.authuser){
        //     window.location.href='/';
        // }
        const fetchData = async () => {
            const res = await axios.get(`https://lief-web-task.vercel.app/api/injurydata/getIndividualData/${id}`);
            const data = (res.data.injury);
            console.log(data);
            setReporter(data.name);
            setDateOfIncident(data.injuryDate);
            setDateofReporting(data.reportDate);
            setTimeOfReporting(data.reportTime);
            setTimeOfIncident(data.injuryTime);
            setInjuryArray(data.injuryDescriptions);
            setisEditable(true);
        }
        fetchData();

    }, [])
    useEffect(() => {
        if (injuryArray.length > 0) {
            const newPoints = injuryArray.map((item: InjuryDescriptionProps) => ({
                x: item.xPos,
                y: item.yPos
            }));
            setPoints(newPoints);
        }
    }, [injuryArray]);

    // useEffect(() => {
    //     const { year, month, day, hour, min } = getDateAndTime();
    //     setDateofReporting(`${year}-${month}-${day}`);
    //     setTimeOfReporting(`${hour}:${min}`);
    // }, [])

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "reporter":
                setReporter(e.target.value);
                break;
            case "dateOfIncident":
                setDateOfIncident(e.target.value);
                break;
            case "dateOfReporting":
                setDateofReporting(e.target.value);
                break;
            case "timeOfIncident":
                setTimeOfIncident(e.target.value);
            default:
                break;
        }
    }

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(injuryArray);
        try {
            if(!isEditable){
            const res = await axios.post("https://lief-web-task.vercel.app/api/injury/create", {
                reporter,
                dateOfIncident,
                dateOfReporting,
                timeOfIncident,
                timeOfReporting,
                email: context?.authuser?.email,
                injuryArray
            })
            console.log(res.data);
        }
        else{
            console.log('here')
            const res=await axios.post("https://lief-web-task.vercel.app/api/injury/update",{
                id,
                reporter,
                dateOfIncident,
                timeOfIncident,
                injuryArray
            })
            console.log(res.data);
            if (res.data) router.push('/injurydata'); 
        }

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-3/4 mx-auto p-6 mt-10 bg-opacity-30 bg-slate-200 rounded-xl shadow-xl backdrop-blur-md">
            <h1 className="text-2xl font-bold text-white mb-4 text-center">Injury Data Form</h1>
            <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e)}>
                <div>
                    <label className="block text-white text-sm font-medium mb-1" >Reporter</label>
                    <input
                        onChange={(e) => handleFormChange(e)}
                        value={reporter}
                        type="text"
                        name="reporter"
                        placeholder="Name of the Reporter"
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                    />
                </div>

                <div>
                    <label className="block text-white text-sm font-medium mb-1">Date and Time of Injury</label>
                    <div className="flex space-x-2">
                        <input
                            onChange={(e) => handleFormChange(e)}
                            value={dateOfIncident}
                            type="date"
                            name="dateOfIncident"
                            className="w-1/2 px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                        />
                        <input
                            onChange={(e) => handleFormChange(e)}
                            value={timeOfIncident}
                            type="time"
                            name="timeOfIncident"
                            className="w-1/2 px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-white text-sm font-medium mb-1">Reporting Time</label>
                    <div className="flex space-x-2">
                        <input
                            disabled
                            type="date"
                            value={dateOfReporting}
                            name="dateOfReporting"
                            className="w-1/2 px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                        />
                        <input
                            disabled
                            type="time"
                            value={timeOfReporting}
                            name="timeOfReporting"
                            className="w-1/2 px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                        />
                    </div>
                </div>
                <p>Click on the injury points</p>
                <BodyMap setPoints={setPoints} points={points} setInjuryArray={setInjuryArray} injuryArray={injuryArray} isEditable={isEditable} />
                {isEditable ? <button type="submit" className="bg-green-600 px-2 py-1 rounded-lg w-1/2">Update</button> : <button type="submit" className="bg-green-600 px-2 py-1 rounded-lg w-1/2">Submit</button>}

            </form>

        </div>
    );
};


export default EditInjuryItem;
