//import prisma from '../../../../utils/prismaClient';
import { NextResponse } from 'next/server';

export async function DELETE(req:Request,{params}:{params:{id:string}}){
    const {id}=params;
    console.log(id);
    return NextResponse.json({msg:'success'},{status:200});
}