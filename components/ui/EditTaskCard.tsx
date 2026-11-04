"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Plus } from 'lucide-react'
import { Label } from './label'
import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TaskFeedBack from '../TaskFeedBack'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select'

type Task = {
        id: string
        title: string
        description: string
        status: string
        due: string
        priority: string
        projectId: string
    }

const EditTaskCard = ({ onClose,task}: { onClose: () => void ,task: Task}) => {
    
    const [title,setTitle] = useState(task.title)
    const [desc,setDesc] = useState(task.description)
    const [due,setDue] = useState(task.due)
    const [newstatus,setNewStatus] = useState(task.status)
    const [newpriority,setNewPriority] = useState(task.priority)
    const [loading,setLoading] = useState(false)

    const [isFeedbackOpen, setIsFeedBackOpen] = useState(false);
    const [type, setType] = useState(0);
    const [error,SetError] = useState("")
    const router = useRouter() 

    const items = [
                        { label: "High Priority", value: "HIGH" },
                        { label: "Medium Priority", value: "MEDIUM" },
                        { label: "Normal", value: "NORMAL" },
                ]
    const status = [
                        { label: "To Do", value: "TODO" },
                        { label: "In Progress", value: "IN_PROGRESS" },
                        { label: "Done", value: "DONE" },
    ]

    const handleSUbmit = async () => {
      setLoading(true)
      console.log(newpriority);
      console.log(newstatus);
      
      
      try {
        const response = await fetch(`/api/projects/${task.projectId}/tasks/${task.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title,
                description: desc,
                status: newstatus,
                due: due
                    ? new Date(`${due}T12:00:00`).toISOString()
                    : null,
                priority: newpriority
            })
        })
        const result = await response.json()
        console.log(result);
        
        if(response.status === 200){
          setType(2)
          router.refresh()
        }else{
          SetError(result.message)
          setType(4)
        }
      } catch {
        setType(3)
      }finally{
        setLoading(false)
        setIsFeedBackOpen(true)
      }
        
        
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      {isFeedbackOpen ? 
      <TaskFeedBack 
            type={type} 
            name={title} 
            desc={""}
            error={error} 
            onClose={() => {
                onClose()
                setIsFeedBackOpen(false)
            }}/> :
      <Card className="w-full max-w-110 rounded-2xl">
        <div className="mx-6 mt-6 flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
          <Plus size={22} />
        </div>
        <CardHeader className="px-6 ">
          <CardTitle className="text-2xl font-semibold">Edit Task</CardTitle>
          <CardDescription>Edit your task name,status and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Task Title</Label>
            <Input
              className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
              placeholder="e.g. Website Redesign"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Description (optional)</Label>
            <Textarea 
                placeholder="What is this project about?"
                value={desc}
                onChange={(e) => setDesc(e.target.value)} 
                />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Due Date</Label>
            <Input
              className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
              placeholder="e.g. Website Redesign"
              type = "date"
              required
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </div>
          <div className='flex justify-between'>
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Priority</Label>
            <Select 
            items={items}
            onValueChange={(v) => setNewPriority(String(v))}
            >
            <SelectTrigger className="w-45 py-6 bg-white ">
              <SelectValue placeholder={newpriority} />
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
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Status</Label>
            <Select 
            items={status}
            onValueChange={(v) => setNewStatus(String(v))}
            >
            <SelectTrigger className="w-45 py-6 bg-white ">
              <SelectValue placeholder={newstatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {status.map((item) => (
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
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2 px-6 py-4">
          <Button variant="outline" className="p-5 cursor-pointer" onClick={onClose}>Cancel</Button>
          <Button className="p-5 cursor-pointer" disabled = {loading} onClick={handleSUbmit}>{loading ? "Updating..." : "Update Task"}</Button>
        </CardFooter>
      </Card>
}
    </div>
  )
}

export default EditTaskCard