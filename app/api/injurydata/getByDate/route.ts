import { prisma } from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const startDate = url.searchParams.get('startdate');
    const endDate = url.searchParams.get('enddate');
    const datetype = url.searchParams.get('datetype');
    try {
        if (!startDate || !endDate || !datetype) return NextResponse.json({ msg: "Fill the required fields" }, { status: 400 });
        if (datetype === "injuryDate") {
            const injuries = await prisma.injury.findMany({
                where: {
                    injuryDate: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })
            console.log(injuries);
            if (!injuries) return NextResponse.json({ msg: "No data Available" }, { status: 400 })
            return NextResponse.json({ injuries }, { status: 200 });
        }
        else {
            const injuries = await prisma.injury.findMany({
                where: {
                    reportDate: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })
            console.log(injuries);
            if (!injuries) return NextResponse.json({ msg: "No data Available" }, { status: 400 })
            return NextResponse.json({ injuries }, { status: 200 });
        }
    }
    catch (err) {
        return NextResponse.json({ err }, { status: 400 })
    }
}