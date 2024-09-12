'use client'
import React, { useState } from "react";
import bodymap from '../assets/bodymap.jpg'
import Image from "next/image";
import dot from '../assets/dot.png'
import { InjuryDescription } from "./injurydesc";
import { InjuryDescriptionProps } from "../registerinjury/page";
import { pointsProps } from "../registerinjury/page";

const BodyMap = ({ points, setPoints, setInjuryArray, injuryArray, isEditable }: { points: pointsProps[], setPoints: React.Dispatch<React.SetStateAction<pointsProps[]>>, setInjuryArray: React.Dispatch<React.SetStateAction<InjuryDescriptionProps[]>>, injuryArray: InjuryDescriptionProps[], isEditable: boolean }) => {
    const [isPointsMarked, setIsPointsMarked] = useState<boolean>();

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (isPointsMarked) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top;
        setPoints((prev) => [...prev, { x, y }]);
    }

    return (
        <div className="relative w-full">
            <Image width={450} height={450} src={bodymap} alt="BodyMap" onClick={handleImageClick} />
            {points.map((point, index) => (
                <div key={index}>
                    <img
                        src={dot.src}
                        style={{
                            "position": "absolute",
                            "top": `${point.y}px`,
                            "left": `${point.x}px`,
                            "width": "0.5rem",
                            "height": "0.5rem",
                            "transform": "translate(-50%,-50%)"
                        }}
                    ></img>
                    <p style={{
                        "position": "absolute",
                        "top": `${point.y}px`,
                        "left": `${point.x}px`,
                        "width": "0.5rem",
                        "height": "0.5rem",
                    }} className="text-black">{index + 1}</p>
                </div>
            ))}
            {isPointsMarked && points.length > 0 ? <h1 className="text-center mt-4 text-xl font-bold">Injury Description Section</h1> : ""}
            {
                isPointsMarked ? <InjuryDescription points={points} setInjuryArray={setInjuryArray} injuryArray={injuryArray} isEditable={isEditable} /> : <button className="px-2 py-1 bg-orange-500 rounded-lg mt-4" onClick={() => setIsPointsMarked(true)}>Proceed to fill Injury Data</button>
            }


        </div>
    )
}

export default BodyMap;
