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

const AddProjectCard = ({ onClose }: { onClose: () => void }) => {
    const [emoji,setEmoji] = useState("")
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [loading,setLoading] = useState(false)
    const [isFeedbackOpen, setIsFeedBackOpen] = useState(false);
    const [type, setType] = useState(0);
    const [error,setError] = useState("")
    const router = useRouter()

    const handleSUbmit = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/projects',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: name,
                description : desc,
                emoji: emoji
            })
        })
        const result = await response.json()
        if(response.status === 201){
          setType(0)
          router.refresh()
        }else{
          setError(result.message)
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
          <CardTitle className="text-2xl font-semibold">Create a project</CardTitle>
          <CardDescription>Give your project a name and a clear purpose.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <EmojiSelector value={emoji} onChange={setEmoji}/>
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
          <Button className="p-5 cursor-pointer" disabled = {loading} onClick={handleSUbmit}>{loading ? "Saving..." : "Create project"}</Button>
        </CardFooter>
      </Card> }
    </div>
  )
}

export default AddProjectCard