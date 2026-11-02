"use client"
import React, { useState } from "react";
import { Button } from "./button";
import { ArrowLeft, Circle, Plus } from "lucide-react";
import AddProjectCard from "./AddProjectCard";
import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskCard";

type Task = {
        id: string
        title: string
        description: string
        status: string
        due: string
        priority: string
        projectId: string
    }

type Project = {
    id: string
    name: string
    status: string
    updatedAt: Date
    createdAt: Date
    emoji : string
    description : string | null
    ownerId: string
}

const Tasks = ({cards,project}: {cards: Task[],project: Project}) => {
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
    let todo =0,inprogress =0,done=0

    for(const card of cards){
        if(card.status === "TODO"){
            todo++
        }else if(card.status === "IN_PROGRESS"){
            inprogress++
        }else{
            done++
        }
    }
    const todoTasks = cards.filter((task) => task.status === "TODO")
    const InpTasks = cards.filter((task) => task.status === "IN_PROGRESS")
    const doneTasks = cards.filter((task) => task.status === "DONE")
  
    
  return (
    <>
      <div className="flex-9 px-10 py-5">
        <p className="text-xs flex items-center text-primary font-bold gap-1"><ArrowLeft size={15}/> Back to projects</p>
        <div className="flex justify-between">
          <div className="flex gap-5 mt-5">
            <div className="bg-primary/20 p-3 rounded-lg">
                <p className="text-xl">🎨</p>
            </div>
            <div>
                <p className="font-semibold text-xl">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.description}</p>
            </div>
          </div>
          <Button className="rounded-lg p-6 cursor-pointer" onClick={() => setIsAddProjectOpen(true)}>
            <Plus /> New Task
          </Button>
        </div>
        <div className="flex items-center mt-12 justify-between gap-5">
          <div className="bg-white rounded-md w-full px-5 py-3 space-y-2">
            <p className="text-muted-foreground uppercase text-xs">Total Tasks</p>
            <p className="text-2xl font-semibold">{cards.length.toString().padStart(2, '0')}</p>
          </div>
          <div className="bg-white rounded-md w-full px-5 py-3  space-y-2">
            <p className="text-muted-foreground uppercase text-xs">IN Progress</p>
            <p className="text-[#634FE5] text-2xl font-semibold">{inprogress.toString().padStart(2, '0')}</p>
          </div>
          <div className="bg-white rounded-md w-full px-5 py-3  space-y-2">
            <p className="text-muted-foreground uppercase text-xs">Completed</p>
            <p className="text-[#1FA673] text-2xl font-semibold">{done.toString().padStart(2, '0')}</p>
          </div>
        </div>
          <p className="font-semibold text-xl mt-8">Task Board</p>
          <p className="text-muted-foreground text-xs">Organize your {"team's"} work at aglance.</p>
        <div className="flex justify-between mt-8 space-y-8 gap-5">
          <div className="bg-primary/5 w-full p-5 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="uppercase flex font-semibold text-sm items-center gap-2"><Circle size={18} fill="#F5A130" stroke="0"/> to do</div>
                <div className="text-[#F5A130] bg-[#F5A130]/20 rounded-2xl px-2 py-1 text-sm font-semibold">{todo.toString().padStart(2, '0')}</div>
            </div>
            <div className="space-y-4 mt-5">
                    {todoTasks.length === 0 ?
                        (<p className="text-muted-foreground text-center text-sm">There is Nothing here..</p>) 
                        : 
                        todoTasks.map((task,key) => (
                            <TaskCard task={task} key={key}/> 
                        ))
                        }
                </div>
          </div>
          <div className="bg-primary/5 w-full p-5 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="uppercase flex font-semibold text-sm items-center gap-2"><Circle size={18} fill="#634FE5" stroke="0"/> in progress</div>
                <div className="text-[#634FE5] bg-[#634FE5]/20 rounded-2xl px-2 py-1 text-sm font-semibold">{inprogress.toString().padStart(2, '0')}</div>
            </div>
            <div className="space-y-4 mt-5">
                    {InpTasks.length === 0 ?
                        (<p className="text-muted-foreground text-center text-sm">Seems your team is free today..</p>) 
                        : 
                        InpTasks.map((task,key) => (
                            <TaskCard task={task} key={key}/> 
                        ))
                        }
                </div>
          </div>
          <div className="bg-primary/5 w-full p-5 rounded-lg h-fit">
            <div className="flex justify-between items-center">
                <div className="uppercase flex font-semibold text-sm items-center gap-2"><Circle size={18} fill="#1FA673" stroke="0"/> done</div>
                <div className="text-[#1FA673] bg-[#1FA673]/20 rounded-2xl px-2 py-1 text-sm font-semibold">{done.toString().padStart(2, '0')}</div>
            </div>
            <div className="space-y-4 mt-5">
                    {doneTasks.length === 0 ?
                        (<p className="text-muted-foreground text-center text-sm">You {"haven't"} make any progress yet..</p>) 
                        : 
                        doneTasks.map((task,key) => (
                            <TaskCard task={task} key={key}/> 
                        ))
                        }
                </div>
          </div>
        </div>
      </div>
      {isAddProjectOpen && (
        <AddTaskCard projId={project.id} onClose={() => setIsAddProjectOpen(false)} />
      )}
    </>
  );
};

export default Tasks;
