import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { InjuryDescriptionProps } from '@/app/registerinjury/page';


export async function POST(req: Request) {
    const { reporter, dateOfIncident, dateOfReporting, timeOfIncident, timeOfReporting, email, injuryArray } = await req.json();
    if (!reporter || !dateOfIncident || !dateOfReporting || !timeOfIncident || !timeOfReporting || !email) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });  // Bad Request
    }
    try {
        console.log(injuryArray);
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {

            const injury = await prisma.injury.create({
                data: {
                    name: reporter,
                    reportDate: dateOfReporting,
                    injuryDate: dateOfIncident,
                    reportTime: timeOfReporting,
                    injuryTime: timeOfIncident,
                    userId: user.id,
                    injuryDescriptions:{
                        create:injuryArray.map((item:InjuryDescriptionProps)=>({
                            bodyPart:item.bodyPart,
                            description:item.description,
                            xPos:item.xPos,
                            yPos:item.yPos
                        }

                        ))
                    }
                }
            })
            return NextResponse.json({ injury }, { status: 201 });
        }
        else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    }
    catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }

}