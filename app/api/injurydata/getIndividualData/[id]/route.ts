import { prisma } from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{id:string}}){
    try{
        const {id}=params;
        const injury=await prisma.injury.findFirst({
            where:{
                id:id
            },
            include:{
                injuryDescriptions:true
            }
        })
        return NextResponse.json({injury},{status:200});
    }
    catch(err){
        return NextResponse.json({err},{status:400})
    }
}