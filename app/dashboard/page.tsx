import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"
import Image from "next/image"
import Logo from "../../public/Primary.png"
import {Bell, ChartPie, Grid3X3,  Plus, Search, Settings, } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProjectCard from "@/components/ui/ProjectCard"

// Request-dependent component
async function DashboardContent() {
    await connection()

    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const items = [
                    { label: "All Projects", value: "all" },
                    { label: "In Progress", value: "in_progress" },
                    { label: "Completed", value: "completed" },
                    ]

    const cards = [
        {topic: "Website Redesign",desc:"A fresh digital expirence for our customers",time:"Updated 2 hours ago",emoji:"🌐"},
        {topic: "Mobile App Launch",desc:"Plan, design and ship the next big thing",time:"Updated yesterday",emoji:"📱"},
        {topic: "AI Reserch Lab",desc:"Exploring ideas, prototypes and experiments",time:"Updated 3 days ago",emoji:"✦"},
    ]
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex flex-1 bg-white p-6  flex-col h-full overflow-y-auto">
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
                        JD
                    </div >
                    <div className="grid ">
                        <p className="font-bold">John Doe</p>
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
                <div className="flex-9 p-12">
                    <div className="flex justify-between">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold">My Projects</h1>
                            <p className="text-muted-foreground">A home for your best ideas and the people building them.</p>
                        </div>
                        <Button className="rounded-lg p-6"><Plus /> New Project</Button>
                    </div>
                    <div className="flex gap-5 items-center relative mt-12">
                        <Search className="absolute text-muted-foreground left-3" size={12}/>
                        <Input
                            placeholder={"Search projects"}
                            className="pl-8 bg-white placeholder:text-gray-400 py-6 w-104.5" 
                        />
                        <Select items={items}>
                            <SelectTrigger className="w-45 py-6 bg-white ">
                                <SelectValue placeholder="All Projects" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {items.map((item) => (
                                    <SelectItem 
                                        key={item.value} 
                                        value={item.value}
                                        className="pl-3 pt-2"
                                        >
                                    {item.label}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                        
                    </div>
                    <div className="flex justify-between text-muted-foreground text-sm mt-6">
                        <p className="font-bold uppercase">Your Projects</p>
                        <p>3 Projects</p>
                    </div>
                    <div className="grid grid-cols-3 mt-8">
                            {cards.map((card,key) => (
                                <ProjectCard 
                                    key={key} 
                                    topic={card.topic}
                                    desc={card.desc}
                                    time={card.time}
                                    emoji={card.emoji}
                                    />
                            ))}
                    </div>
                    <div className="flex flex-col rounded-md items-center justify-center gap-3 border-primary/30 border-2 w-85 h-42 mt-8">
                        <Plus className="text-primary" size={36}/>
                        <p className="text-xl font-bold">Start Something New</p>
                        <p className="text-sm text-muted-foreground">
                            Create Your Next Project
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Page component
export default function Dashboard() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    )
}