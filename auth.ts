import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import {z} from "zod"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const loginSchema = z.object({
            email: z.email("Invalid Email Address"),
            password: z.string().min(8,"Password must have at least 8 characters")
        })
        const result = loginSchema.safeParse(credentials)

        if(!result.success){
            return null
        }
        const {email,password} = result.data


        const user = await prisma.user.findUnique({
            where:{
                email: email.toLowerCase()
            }
        })

        if(!user){
            return null
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return null
        }

        return{
                id: user.id,
                name: user.name,
                email: user.email
            }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id
        }
        return token
    },

    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string
        }
        return session
    }
}
});

