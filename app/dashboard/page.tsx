import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import Image from "next/image"
import Logo from "../../public/Primary.png"
import {Bell, ChartPie, Grid3X3, Search, Settings, } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import MyProjects from "@/components/ui/MyProjects"


export default async function DashboardContent() {
    await connection()

    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }
    const userName = session?.user?.name ?? "Guest"
    const userInitials = userName
        .trim()
        .split(/\s+/)
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    

    
    const projects = await prisma.project.findMany({
        where: {
            ownerId: session.user.id
        },
        orderBy: {
            updatedAt: "desc"
        }
    })


   


    const cards = projects.map((project) => ({
        ...project,
        description: project.description ?? undefined,
        time: `${formatDistanceToNow(project.updatedAt, {
            addSuffix: true
        })}`
    }))

    


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
                        Workspace/Projects
                    </div>
                    <div className="flex gap-5 items-center relative">
                        <Search className="absolute text-muted-foreground left-2" size={16}/>
                        <Input
                            placeholder={"Search projects"}
                            className="pl-8 " 
                        />
                        <div className="bg-accent p-3 rounded-full">   
                            <Bell size={18} className="text-primary"/>
                        </div>
                    </div>
                </div>
               <MyProjects cards={cards}/>
            </div>
            
        </div>
        
    )

}
