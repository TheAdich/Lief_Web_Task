import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user}) {
        // Check if the user exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email ?? "" },
        });

        if (!existingUser) {
            // Create a new user if they don't exist
            await prisma.user.create({
                data: {
                    username: user.name ?? "" ,
                    email: user.email ?? "",
                },
            });
        }

        return true; 
    },
},
})

export { handler as GET, handler as POST }