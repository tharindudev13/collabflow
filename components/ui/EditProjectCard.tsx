"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Plus } from 'lucide-react'
import { Label } from './label'
import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import EmojiSelector from './EmojiSelector'
import { useState } from 'react'
import FeedBack from '../FeedBack'
import { useRouter } from 'next/navigation'

const EditProjectCard = ({ onClose,projectId,pname,description,emoji}: { onClose: () => void ,projectId: string,pname:string,description: string,emoji: string}) => {
    
    const [newemoji,setnewEmoji] = useState(emoji)
    const [name,setName] = useState(pname)
    const [desc,setDesc] = useState(description)
    const [loading,setLoading] = useState(false)

    const [isFeedbackOpen, setIsFeedBackOpen] = useState(false);
    const [type, setType] = useState(0);
    const [error,SetError] = useState("")
    const router = useRouter() 

    const handleSUbmit = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/projects',{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                projectId: projectId,
                name: name,
                description : desc,
                emoji : newemoji
            })
        })
        const result = await response.json()
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
      <FeedBack 
            type={type} 
            name={name} 
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
          <CardTitle className="text-2xl font-semibold">Update project</CardTitle>
          <CardDescription>Update your project  name and description.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <EmojiSelector value={newemoji} onChange={setnewEmoji}/>
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Project name</Label>
            <Input
              className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
              placeholder="e.g. Website Redesign"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
        </CardContent>
        <CardFooter className="justify-end gap-2 px-6 py-4">
          <Button variant="outline" className="p-5 cursor-pointer" onClick={onClose}>Cancel</Button>
          <Button className="p-5 cursor-pointer" disabled = {loading} onClick={handleSUbmit}>{loading ? "Updating..." : "Update project"}</Button>
        </CardFooter>
      </Card>
}
    </div>
  )
}

export default EditProjectCard