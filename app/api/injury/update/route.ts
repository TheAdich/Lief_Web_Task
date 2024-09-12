import { prisma } from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";
import { InjuryDescriptionProps } from '@/app/registerinjury/page';



export async function POST(req: Request) {
    const { reporter, dateOfIncident, timeOfIncident, injuryArray, id } = await req.json();
    console.log(reporter,dateOfIncident,timeOfIncident,injuryArray,id);
    if (!reporter || !dateOfIncident || !timeOfIncident || !id  ){
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });  // Bad Request
    }
    try {
        const updatedInjury = await prisma.injury.update({
            where: {
                id: id
            },
            data: {
                name: reporter,
                injuryDate: dateOfIncident,
                injuryTime: timeOfIncident,
                injuryDescriptions: {
                    deleteMany: {},
                    create: injuryArray.map((item: InjuryDescriptionProps) => ({
                        bodyPart: item.bodyPart,
                        description: item.description,
                        xPos: item.xPos,
                        yPos: item.yPos
                    }))

                }
            }

        })
        return NextResponse.json({ injury: updatedInjury }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: err }, { status: 400 }); // Internal Server Error
    }


}