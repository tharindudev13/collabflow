"use client"
import React, { useState } from "react";
import { Button } from "./button";
import { Plus, Search } from "lucide-react";
import { Input } from "./input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";

type Project = {
        id: string
        name: string
        status: string
        updatedAt: Date
        createdAt: Date
        emoji : string
        description? : string
        time: string
        ownerId: string
    }

const MyProjects = ({cards} : {cards : Project []}) => {
    const [status,setStatus] = useState("all")
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
    


    const items = [
                        { label: "All Projects", value: "all" },
                        { label: "In Progress", value: "In Progress" },
                        { label: "Completed", value: "Completed" },
                ]
    
    const filteredCards = cards.filter(
        project =>
            status === "all" ||
            project.status === status
    )
  return (
    <>
      <div className="flex-9 p-12">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">
              A home for your best ideas and the people building them.
            </p>
          </div>
          <Button className="rounded-lg p-6 cursor-pointer" onClick={() => setIsAddProjectOpen(true)}>
            <Plus /> New Project
          </Button>
        </div>
        <div className="flex gap-5 items-center relative mt-12">
          <Search className="absolute text-muted-foreground left-3" size={12} />
          <Input
            placeholder={"Search projects"}
            className="pl-8 bg-white placeholder:text-gray-400 py-6 w-104.5"
          />
          <Select 
            items={items}
            onValueChange={(v) => setStatus(String(v))}
            >
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
        <div className="grid grid-cols-3 mt-8 space-y-8">
          {filteredCards.map((card, key) => (
            <ProjectCard
              key={key}
              topic={card.name}
              desc={card.description ?? ""}
              time={card.time}
              emoji={card.emoji}
              id = {card.id}
            />
          ))}
        </div>
        <button
          type="button"
          className="flex flex-col rounded-md items-center justify-center gap-3 border-primary/30 border-2 w-85 h-42 mt-8 cursor-pointer hover:scale-102 hover:bg-primary/10"
          onClick={() => setIsAddProjectOpen(true)}
        >

          <Plus className="text-primary" size={36} />
          <p className="text-xl font-bold">Start Something New</p>
          <p className="text-sm text-muted-foreground">
            Create Your Next Project
          </p>
        </button>
      </div>
      {isAddProjectOpen && (
        <AddProjectCard onClose={() => setIsAddProjectOpen(false)} />
      )}
    </>
  );
};

export default MyProjects;
