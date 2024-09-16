import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req: Request) {
    const { username, email } = await req.json();
    if (!username || !email) return NextResponse.json({ message: 'Fill all the required fields' }, { status: 409 })
    if (req.method === 'POST') {
        const checkIfUserExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!checkIfUserExists) {
            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                }
            })
            console.log(user);
            if (user) return NextResponse.json(user, { status: 200 });
        }
    }
    else {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }
}