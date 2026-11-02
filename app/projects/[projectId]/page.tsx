import { auth } from "@/auth"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import Logo from "../../../public/Primary.png"
import { ChartPie, Grid3X3,  Settings, } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Tasks from "@/components/ui/Tasks"


export default async function ProjectTasks({params}: {params: {projectId: string}}) {

    const {projectId} = await params;

    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            ownerId: session.user.id
        }
    })

    if(!project){
        notFound()
    }

    const tasks = await prisma.task.findMany({
            where: {
                projectId: projectId
            }
        })

    const userName = session?.user?.name ?? "Guest"
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    
    const cards = tasks.map((task) => ({
        ...task,
        description: task.description ?? "",
        due: task.due
            ? task.due.toISOString().slice(0, 10)
            : ""
        }))

    const userInitials = userName
        .trim()
        .split(/\s+/)
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    


    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex flex-1 bg-white p-6  flex-col h-full overflow-y-auto">
                <Link href="/">
                <div className="flex-1 gap-3 flex">
                    <Image
                    src={Logo}
                    alt="CollabFlow"
                    width={35}
                    height={35}
                    className="rounded-lg shrink-0 self-start object-contain"
                />
                <p className="font-bold text-2xl">Collab<span className="text-primary">Flow</span></p>
                </div>
                </Link>
                <div className="flex-17">
                    <p className="text-xs text-muted-foreground font-medium mt-12">WORKSPACE</p>

                    <div className="rounded-lg flex gap-2 items-center bg-accent p-2 mt-3 text-primary font-bold">
                            <Grid3X3 size={16}/>
                            My Projects
                    </div>
                    <div className="rounded-lg flex gap-2 items-center  p-2 mt-3 text-muted-foreground">
                            <ChartPie size={16}/>
                            Activity
                    </div>
                    <div className="rounded-lg flex gap-2 items-center  p-2 mt-3 text-muted-foreground">
                            <Settings size={16}/>
                            Settings
                    </div>
                
                </div>
                <div className="flex-2">
                <Separator className="mb-4"/>

                    <div className="flex gap-4 items-center">
                        <div className="rounded-full w-fit p-3 bg-accent text-primary font-bold">
                        {userInitials}
                    </div >
                    <div className="grid ">
                        <p className="font-bold">{userName}</p>
                        <p className="text-xs text-gray-500">Personal Workspace</p>
                    </div>
                    </div>
                    
                </div>

                
            </div>

            <div className="flex flex-col flex-5 bg-accent h-full overflow-y-auto scrollbar-thin">
                <div className=" flex-1 flex bg-[#ffffff] py-4 px-12 justify-between items-center">
                    <div className="flex text-muted-foreground">
                        Workspace/My Projects/ {project?.name}
                    </div>
                    <div className="flex gap-5 items-center relative">
                        <div className="rounded-full w-fit p-3 bg-accent text-primary font-bold">
                            {userInitials}
                        </div >
                    </div>
                </div>
               <Tasks cards={cards} project={project}/>
            </div>
            
        </div>
        
    )

}

