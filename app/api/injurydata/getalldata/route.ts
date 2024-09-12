import {prisma} from '../../../utils/prismaClient';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    const {email}=await req.json();
    if(!email) return NextResponse.json({msg:"Unauthorised"},{status:401})
    try{
    const user=await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(!user) return NextResponse.json({msg:"user not found"},{status:200});
    const injuries=await prisma.injury.findMany({
        where:{
            userId:user.id
        },
        orderBy:{
            updatedAt:'desc'
        }
    });
    //console.log(res);
    return NextResponse.json({injuries},{status:200})
    }
    catch(err){
        return NextResponse.json({err},{status:400})
    }
}