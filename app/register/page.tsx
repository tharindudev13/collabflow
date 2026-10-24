"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register(){
    const [showPwd,setShowPwd] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [pwd,setPwd] = useState("")
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")

    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const response = await fetch("/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password:pwd
                })
            })
            const result = await response.json()
            
            if(!response.ok){
                if(response.status === 409){
                    setError("This Email already registerd.")                
                }else if(response.status === 400){
                    setError("Please check your information")                
                }else if(response.status === 500){
                    setError("Registration Failed. Please try again.")
                }
                return
            }
            router.push("/login")
        } catch (err) {
            setError("Something went wrong. Please Try Again.")
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold text-primary">
                        Register
                    </CardTitle>
                    <CardDescription className="text-center text-sm">
                        Bring your ideas to life, together.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="pl-5 pb-5">
                        <div className="space-y-2">
                            {error && (
                                <div className="bg-destructive/25 text-destructive p-3 rounded-lg">
                                    <p>{error}</p>
                                </div>
                            )}
                            <Label className="text-gray-700">Name</Label>
                            <Input 
                                className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                placeholder="John Doe"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Label className="text-gray-700">Email</Label>
                            <Input 
                                className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                placeholder="johndoe@example.com"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Label className="text-gray-700">Password</Label>
                            <div className="relative">
                                <Input 
                                    className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                    placeholder="**********"
                                    type={showPwd? "text" : "password"}
                                    required
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPwd? 
                                        <EyeClosed className='h-4 w-4 cursor-pointer'/>
                                        : 
                                        <Eye className='h-4 w-4 cursor-pointer'/>
                                    }
                                </button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button 
                            className="w-full cursor-pointer disabled:bg-primary/90"
                            type='submit'
                            disabled = {loading || email === "" || pwd ==="" || name === ""}
                        >
                            {loading ? "Creating your account":"Sign Up"}
                        </Button>
                        <p className="text-muted-foreground">{"Already have an account?"} 
                            <Link href="/login" className="ml-1 hover:underline text-primary font-medium">
                                    Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
        </>
    )
}