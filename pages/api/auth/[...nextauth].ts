import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Prisma from "lib/server/initPrisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"



const authOptions: NextAuthOptions =  NextAuth({
    adapter: PrismaAdapter(Prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async jwt({ token }) {
            return token
        },
    }
})

export default authOptions