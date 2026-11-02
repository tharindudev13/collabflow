"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Plus } from 'lucide-react'
import { Label } from './label'
import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select'
import TaskFeedBack from '../TaskFeedBack'

const AddTaskCard = ({ onClose ,projId}: { onClose: () => void ,projId: string}) => {
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [due,setDue] = useState("")
    const [loading,setLoading] = useState(false)
    const [isFeedbackOpen, setIsFeedBackOpen] = useState(false);
    const [type, setType] = useState(0);
    const [error,setError] = useState("")
    const router = useRouter()
    const [priority,setPriority] = useState("")

    const items = [
                        { label: "High Priority", value: "HIGH" },
                        { label: "Medium Priority", value: "MEDIUM" },
                        { label: "Normal", value: "NORMAL" },
                ]
    const handleSUbmit = async () => {
      setLoading(true)
      console.log(priority);
      
      try {
        const response = await fetch(`/api/projects/${projId}/tasks`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title: title,
                description : desc,
                due: new Date(due),
                priority: priority
                
            })
        })

        const result = await response.json()
        if(response.status === 201){
          setType(0)
          router.refresh()
        }else{
          setError(result.message)
          console.log(result);
          
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
          desc={desc}
          onClose={() => {
            onClose()
            setIsFeedBackOpen(false)
          }}
          error={error}
            /> :

      <Card className="w-full max-w-110 rounded-2xl">
        <div className="mx-6 mt-6 flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
          <Plus size={22} />
        </div>
        <CardHeader className="px-6 ">
          <CardTitle className="text-2xl font-semibold">Create a Task</CardTitle>
          <CardDescription>Make a new task for this project</CardDescription>
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
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Priority</Label>
            <Select 
            items={items}
            onValueChange={(v) => setPriority(String(v))}
            >
            <SelectTrigger className="w-45 py-6 bg-white ">
              <SelectValue placeholder="Select" />
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
          
        </CardContent>
        <CardFooter className="justify-end gap-2 px-6 py-4">
          <Button variant="outline" className="p-5 cursor-pointer" onClick={onClose}>Cancel</Button>
          <Button className="p-5 cursor-pointer" disabled = {loading} onClick={handleSUbmit}>{loading ? "Saving..." : "Create Task"}</Button>
        </CardFooter>
      </Card> }
    </div>
  )
}

export default AddTaskCard