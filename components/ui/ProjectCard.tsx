import React from 'react'
import { Card } from './card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { ArrowRight, ArrowUpRight, Ellipsis, Pencil, Trash } from 'lucide-react'
import { Separator } from '@base-ui/react'

const ProjectCard = ({topic,desc,time,emoji}:{topic: string,desc:string,time:string,emoji:string}) => {
  return (
    
                    <div>
                        <Card className="w-85 p-7">
                            <div className="flex justify-between">
                                <div className="bg-accent text-3xl rounded-2xl p-2">
                                    {emoji}
                                </div>
                                <DropdownMenu >
                                    <DropdownMenuTrigger>
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="p-2 w-fit">
                                        <DropdownMenuItem>
                                            <ArrowUpRight /> Open Project
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Pencil /> Edit Project
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="" variant="destructive">
                                            <Trash /> Delete Project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className="text-xl font-bold">{topic}</p>
                            <p className="text-muted-foreground">{desc}</p>
                            <Separator />
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">{time}</p>
                                <p className="text-primary flex items-center font-bold gap-2">Open Project<ArrowRight size={12}/> </p>
                            </div>
                        </Card>
                    </div>
  )
}

export default ProjectCard