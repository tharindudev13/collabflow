import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { ArrowUpRight, Ellipsis, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DeleteTaskCard from './DeleteTaskCard'
import EditTaskCard from './EditTaskCard'

type Task = {
        id: string
        title: string
        description: string
        status: string
        due: string
        priority: string
        projectId: string
    }

    

const TaskCard = ({ task }: { task: Task }) => {
    const [isEditTaskOpen,setIsEditTaskOpen] = useState(false)
    const [isDeleteTaskOpen,setIsDeleteTaskOpen] = useState(false)
    let color;
    if(task.priority === "HIGH"){
        color = "#E3475C"
    }else if(task.priority === "MEDIUM"){
        color = "#634FE5"
    }else {
        color = "#1FA673"
    }
    const router = useRouter()
  return (
    <div>
    <Card>
        <CardHeader >
            <div 
                className='bg-accent flex justify-between py-2 px-1 border-l-4 rounded-xs'
                style={{borderColor: color}}
            >
                <p className='font-semibold'>{task.title}</p>
                <DropdownMenu >
                    <DropdownMenuTrigger className="cursor-pointer">
                        <Ellipsis size={18}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 w-fit">
                        <DropdownMenuItem >
                            <ArrowUpRight /> Open Task
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsEditTaskOpen(true)}>
                            <Pencil /> Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="" variant="destructive" onClick={() => setIsDeleteTaskOpen(true)}>
                            <Trash /> Delete Task
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className='text-muted-foreground'>{task.description}</p>
        </CardHeader>
        <CardContent>
            <div 
                className='bg-${color}/30 w-fit rounded-2xl px-3 py-1 text-${color} font-semibold'
                style={{backgroundColor: `${color}30`,color: color}}
            >
                {task.priority} priority
            </div>
        </CardContent>
        <CardFooter className='text-xs text-muted-foreground'>
            {
                task.due
                    ? `Due ${new Date(`${task.due}T12:00:00`).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                    })}`
                    : "No due date"
            }
        </CardFooter>
    </Card>
    {isEditTaskOpen && (
                            <EditTaskCard 
                                onClose={() => setIsEditTaskOpen(false)}
                                task = {task}
                                />
                        )}
                        {isDeleteTaskOpen && (
                            <DeleteTaskCard
                                onClose={() => setIsDeleteTaskOpen(false)}
                                projectId={task.projectId}
                                name={task.title}
                                taskId={task.id}
                                />
                        )}
    </div>
  )
}

export default TaskCard