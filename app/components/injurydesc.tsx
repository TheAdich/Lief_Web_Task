'use client'
import React, { useEffect, useState } from "react"
import { InjuryDescriptionProps } from "../registerinjury/page"
import { pointsProps } from "../registerinjury/page"




export const InjuryDescription = ({ points, setInjuryArray, isEditable, injuryArray }: { points: pointsProps[], setInjuryArray: React.Dispatch<React.SetStateAction<InjuryDescriptionProps[]>>, isEditable: boolean, injuryArray: InjuryDescriptionProps[] }) => {
    const [individualInjury, setIndividualInjury] = useState<InjuryDescriptionProps[]>([]);
    useEffect(() => {
        if (!isEditable) {
            setIndividualInjury(
                Array(points.length).fill({ bodyPart: "", description: "" }).map((item, index) => ({
                    ...item,
                    xPos: points[index].x,
                    yPos: points[index].y
                }))
            )
        }
    }, [points])

    // useEffect(()=>{
    //     console.log(individualInjury);
    // },[setIndividualInjury])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        if (!isEditable) {
            const { name } = e.target;
            const updatedInjury = individualInjury.map((item, i) => {
                if (i === index) {
                    return { ...item, [name]: e.target.value }
                }
                else {
                    return item;
                }
            })
            setIndividualInjury(updatedInjury);
            setInjuryArray(updatedInjury);
        }
        else {
            const { name } = e.target;
            const updatedInjury = injuryArray.map((item, i) => {
                if (i === index) {
                    return { ...item, [name]: e.target.value }
                }
                else {
                    return item;
                }
            })
            setInjuryArray(updatedInjury);
        }

    }
    return (
        <>
            {!isEditable ?
                individualInjury.map((injury, index) => (
                    <div className="ml-2 mb-8 flex h-fit flex-col w-full" key={index}>
                        <h1>Description for point-{index + 1}</h1>

                        <input
                            name="bodyPart"
                            value={injury.bodyPart}
                            className="w-3/4 outline-none text-black mt-2 px-2 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow duration-300"
                            type="text"
                            placeholder="Enter Body Part"
                            onChange={(e) => handleChange(e, index)}
                        />
                        <textarea
                            name="description"
                            value={injury.description}
                            className="w-3/4 outline-none text-black mt-2 px-2 py-2 bg-gray-100 border border-gray-300 rounded-lg resize-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow duration-300"
                            placeholder="Enter Injury Description"
                            rows={4}
                            cols={50}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>
                )) : injuryArray.map((injury, index) => (
                    <div className="ml-2 mb-8 flex h-fit flex-col w-full" key={index}>
                        <h1>Description for point-{index + 1}</h1>

                        <input
                            name="bodyPart"
                            value={injury.bodyPart}
                            className="w-3/4 outline-none text-black mt-2 px-2 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow duration-300"
                            type="text"
                            placeholder="Enter Body Part"
                            onChange={(e) => handleChange(e, index)}
                        />
                        <textarea
                            name="description"
                            value={injury.description}
                            className="w-3/4 outline-none text-black mt-2 px-2 py-2 bg-gray-100 border border-gray-300 rounded-lg resize-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow duration-300"
                            placeholder="Enter Injury Description"
                            rows={4}
                            cols={50}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>
                ))}
        </>

    )
}