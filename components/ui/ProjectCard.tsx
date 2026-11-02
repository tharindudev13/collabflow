"use client"
import React, { useState } from 'react'
import { Card } from './card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { ArrowRight, ArrowUpRight, Ellipsis, Pencil, Trash } from 'lucide-react'
import { Separator } from '@base-ui/react'
import EditProjectCard from './EditProjectCard'
import DeleteProjectCard from './DeleteProjectCard'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ProjectCard = ({topic,desc,time,emoji,id}:{topic: string,desc:string,time:string,emoji:string,id:string}) => {
    const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
    const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false)
    const router = useRouter()
    
  return (
    
                    <div>
                        <Card className="w-78 p-7">
                            <div className="flex justify-between">
                                <div className="bg-accent text-3xl rounded-2xl p-2">
                                    {emoji}
                                </div>
                                <DropdownMenu >
                                    <DropdownMenuTrigger >
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="p-2 w-fit">
                                        <DropdownMenuItem onClick={() => router.push(`/projects/${id}`)}>
                                            <ArrowUpRight /> Open Project
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIsEditProjectOpen(true)}>
                                            <Pencil /> Edit Project
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="" variant="destructive" onClick={() => setIsDeleteProjectOpen(true)}>
                                            <Trash /> Delete Project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className="text-xl font-bold">{topic}</p>
                            <p className="text-muted-foreground">{desc}</p>
                            <Separator />
                            <div className="flex justify-between">
                                <p className="text-muted-foreground text-xs">{time}</p>
                               <Link href={`/projects/${id}`}><p className="text-primary flex items-center font-bold gap-2 text-xs">Open Project<ArrowRight size={12}/> </p></Link>
                            </div>
                        </Card>
                        {isEditProjectOpen && (
                            <EditProjectCard 
                                onClose={() => setIsEditProjectOpen(false)}
                                projectId={id}
                                pname={topic}
                                description={desc}
                                emoji={emoji} 
                                />
                        )}
                        {isDeleteProjectOpen && (
                            <DeleteProjectCard
                                onClose={() => setIsDeleteProjectOpen(false)}
                                projectId={id}
                                pname={topic}
                                />
                        )}
                    </div>
  )
}

export default ProjectCard