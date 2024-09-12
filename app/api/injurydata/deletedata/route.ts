import { NextResponse } from "next/server";
import {prisma} from '../../../utils/prismaClient'
export async function POST(req:Request){
    const {id,email}=await req.json();
    try{
        await prisma.injury.delete({
            where:{
                id:id
            }
        })
        const user=await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        const injuries=await prisma.injury.findMany({
            where:{
                userId:user?.id
            }
        });
        return NextResponse.json({injuries}, {status:200});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({err},{status:400});
    }
}