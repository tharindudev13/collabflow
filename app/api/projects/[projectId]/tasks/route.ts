import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET(request: Request ,{params}: {params: Promise<{projectId: string}>}){
    const {projectId} = await params;

    try{
        const session = await auth()
        if(!session?.user.id){
            return NextResponse.json(
                {message: "Unathorized"},
                {status: 401}
            )
        }
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })
        if(!project){
            return NextResponse.json(
                {message: "Project not found"},
                {status: 404}
            )
        }

        if(project.ownerId !== session?.user.id){
            return NextResponse.json(
                {message: "Access Denied"},
                {status: 403}
            )
        }

        const tasks = await prisma.task.findMany({
            where: {
                projectId: projectId
            }
        })
        return NextResponse.json(
            {tasks: tasks},
            {status: 200}
        )
    }catch(err){
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        )
    }
}

export async function POST(request : Request, {params} : {params: Promise<{projectId: string}>}){
    const {projectId} = await params
    try{
        const session = await auth()
        if(!session?.user.id){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
        let body: unknown;
        try{
            body = await request.json()
        }catch(err){
            if (err instanceof SyntaxError) {
                return NextResponse.json(
                { message: "Invalid JSON format." },
                { status: 400 },
                );
            }

            throw err;
        }
        const taskSchema = z.object({
            title: z.string().trim().min(1,"Project title is required."),
            description: z.string().trim().optional()
        })

        const result = taskSchema.safeParse(body)

        if(!result.success){
            return NextResponse.json(
                {message: "Validation failed"},
                {status: 400}
            )
        }

        const {title,description} = result.data

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        if(!project){
            return NextResponse.json(
                {message: "Project Not Found"},
                {status: 404}
            )
        }

        if(project.ownerId !== session.user.id){
            return NextResponse.json(
                {message: "Access Denied"},
                {status: 403}
            )
        }

        const task = await prisma.task.create({
            data: {
                projectId: projectId,
                title: title,
                description: description
            }
        })

        return NextResponse.json(
            {
                message: "Task created successfully",
                task: {
                    title: task.title,
                    description: task.description,
                    status: task.status
                }

            },
            {status: 201}
        )
    }catch{
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}

