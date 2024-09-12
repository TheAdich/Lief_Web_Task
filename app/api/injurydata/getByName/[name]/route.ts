import { prisma } from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { name: string } }) {
    const { name } = params;
    console.log("name:" + name);
    try {
        if (name === "") {
            const injuries = await prisma.injury.findMany();
            if (!injuries) return NextResponse.json({ msg: "Not Found" }, { status: 404 });
            return NextResponse.json({ injuries }, { status: 200 });
        }
        else {
            const injuries = await prisma.injury.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            })

            if (!injuries) return NextResponse.json({ msg: "Not Found" }, { status: 404 });
            return NextResponse.json({ injuries }, { status: 200 });
        }
    }
    catch (err) {
        return NextResponse.json({ err }, { status: 400 });
    }

}