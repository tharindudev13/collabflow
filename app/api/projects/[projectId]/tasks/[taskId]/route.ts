import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

export async function PATCH(request : Request, {params} : {params: Promise<{
      projectId: string
      taskId: string
    }>
}){
    const {projectId,taskId} = await params
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
            description: z.string().trim()
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

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })

        if(!task){
            return NextResponse.json(
                {message: "Project Not Found"},
                {status: 404}
            )
        }

        if(project?.ownerId !== session.user.id){
            return NextResponse.json(
                {message: "Access Denied"},
                {status: 403}
            )
        }

        const newtask = await prisma.task.update({
            where: {
                id : taskId
            },
            data: {
                title: title,
                description: description
            }
        })

        return NextResponse.json(
            {
                message: "Task updated successfully",
                task: {
                    title: task.title,
                    description: task.description,
                    status: task.status
                }

            },
            {status: 200}
        )
    }catch(err){
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}

export async function DELETE(request: Request ,{params}: {params: Promise<{
      projectId: string
      taskId: string
    }>
}){
    const {projectId,taskId} = await params;

    try{
        const session = await auth()
        // if(!session?.user.id){
        //     return NextResponse.json(
        //         {message: "Unathorized"},
        //         {status: 401}
        //     )
        // }
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })
        if(!task){
            return NextResponse.json(
                {message: "Task not found"},
                {status: 404}
            )
        }

        // if(project?.ownerId !== session?.user.id){
        //     return NextResponse.json(
        //         {message: "Access Denied"},
        //         {status: 403}
        //     )
        // }

        await prisma.task.delete({
            where: {
                id: taskId
            }
        })
        
        return NextResponse.json(
            {message: "Task deleted successfully."},
            {status: 200}
        )
    }catch(err){
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        )
    }
}