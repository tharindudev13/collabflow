import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {z} from "zod"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      )
    }
    let body: unknown;

    try {
      body = await request.json();
    } catch (err) {
      if (err instanceof SyntaxError) {
        return NextResponse.json(
          { message: "Invalid JSON format." },
          { status: 400 },
        );
      }

      throw err;
    }

    const postSchema = z.object({
        name: z.string().trim().min(1,"Project name required"),
        description: z.string(),
        emoji: z.string().trim().max(1)
    })

    const result = postSchema.safeParse(body)

    if(!result.success){
        return NextResponse.json(
            { 
                message: "Input Validation failed",
                errors: z.flattenError(result.error).fieldErrors
            },
            {status: 400}
        )
    }

    const {name,description,emoji} = result.data

    const project = await prisma.project.create({
        data: {
            name: name,
            description: description,
            ownerId : session.user.id,
            emoji: emoji
        }
    })

    return NextResponse.json(
        {
          message: "Project created successfully.",
          project: {
            name: name,
            description : description
          }
        },
        {status: 201}
    )

  } catch (err) {
    return NextResponse.json(
        {message: "Internal Server Error",err: err},
        {status: 500}
    )
  }
}

export async function GET(){
  try{
    const session = await auth()
    if(!session?.user?.id){
        return NextResponse.json(
            {message: "Unathorized"},
            {status: 401}
        )
    }
    const projects = await prisma.project.findMany({
      where: {
        ownerId: session?.user?.id
      }
    })
    
    return NextResponse.json(
      {projects: projects},
      {status:200}
    )
  }catch{
    return NextResponse.json(
      {message: "Internal Server Error"},
      {status: 500}
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if(!session?.user?.id){
        return NextResponse.json(
            {message: "Unathorized"},
            {status: 401}
        )
    }
    let body: unknown;

    try {
      body = await request.json();
    } catch (err) {
      if (err instanceof SyntaxError) {
        return NextResponse.json(
          { message: "Invalid JSON format." },
          { status: 400 },
        );
      }

      throw err;
    }

    const postSchema = z.object({
        projectId: z.string().trim().min(1,"Project Id required"),
        name: z.string().trim().min(1,"Project name required"),
        description: z.string(),
        emoji: z.string().trim().max(1)
    })

    const result = postSchema.safeParse(body)

    if(!result.success){
        return NextResponse.json(
            { 
                message: "Validation failed",
                errors: z.flattenError(result.error).fieldErrors
            },
            {status: 400}
        )
    }

    const {projectId,name,description,emoji} = result.data

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

    const newProj = await prisma.project.update({
      where: {
        id: projectId
      },
      data:{
        name: name,
        description: description,
        emoji: emoji
      }
    })
    

    return NextResponse.json(
        {
          message: "Project updated successfully.",
           project: {
            name: name,
            description : description,
            emoji : emoji
          }
        },
        {status: 200}
    )

  } catch (err) {
    return NextResponse.json(
        {message: "Internal Server Error",err: err},
        {status: 500}
    )
  }
}

export async function DELETE(request: Request){
  const {searchParams} = new URL(request.url)

  const projectId = searchParams.get("id")
  try{
    const session = await auth()
    if(!session?.user?.id){
        return NextResponse.json(
            {message: "Unathorized"},
            {status: 401}
        )
    }
    if(!projectId){
      return NextResponse.json(
        {message: "Project Id required"},
        {status: 400}
      )
    }
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

    if(project.ownerId != session?.user?.id){
      return NextResponse.json(
        {message: "Frobiden"},
        {status: 403}
      )
    }

    await prisma.project.delete({
      where: {
        id: projectId
      }
    })
    
    return NextResponse.json(
      {message: "Project Deleted Successfully"},
      {status:200}
    )
  }catch(err){
    return NextResponse.json(
      {message: "Internal Server Error",error: err},
      {status: 500}
    )
  }
}
