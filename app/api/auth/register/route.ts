import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import {z} from "zod"


export async function POST(request: Request) {
    let body : unknown
    try{
        body = await request.json()
        const registerSchema = z.object({
            name: z.string().trim().min(1,"Name is required."),
            email: z.string().trim().toLowerCase().pipe(z.email()),
            password: z.string().min(8,"Password must have at least 8 characters.")
        })

        const result = registerSchema.safeParse(body)

        if(!result.success){
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: z.flattenError(result.error).fieldErrors
                },
                {status: 400}
            )
        }

        const {name,email,password} = result.data

        if(await prisma.user.findUnique({
            where: {
                email: email
            }
        })){
            return NextResponse.json(
                {message: "This Email Already Registered."},
                {status: 409}
            )
        }

        const pwdHash = await bcrypt.hash(password,12)

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: pwdHash
            }
        })

        return NextResponse.json(
            {message: "Account Created Successfully."},
            {status: 201}
        )
    }catch(err){
        if(
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002" 
        ){
            return NextResponse.json(
            {message: "Email already registerd",},
            {status:409}
        )
        }
        return NextResponse.json(
            {message: "Internal Server Error."},
            {status:500}
        )
    }

}