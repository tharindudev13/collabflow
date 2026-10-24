"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login(){
    const [showPwd,setShowPwd] = useState(false)
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
            const result = await signIn("credentials",{
                email: email,
                password: pwd,
                redirect: false
            })
            if(result?.error){
                setError("Invalid Credentials. Please Try Again.")
                console.log(result.code);
                
                return
            }
            router.push("/dashboard")
            router.refresh()
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
                        LogIn
                    </CardTitle>
                    <CardDescription className="text-center text-sm">
                        {"Welcome back! Let's make progress together."}
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
                            <Label className="text-gray-700">Email</Label>
                            <Input 
                                required
                                className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                placeholder="johndoe@example.com"
                                type="text"
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                            />
                            <Label className="text-gray-700">Password</Label>
                            <div className="relative">
                                <Input 
                                    required
                                    className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                    placeholder="**********"
                                    type={showPwd? "text" : "password"}
                                    value={pwd}
                                    onChange={(e) =>setPwd(e.target.value)}
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
                            disabled = {loading || email === "" || pwd === ""}
                            type='submit'
                        >
                            {loading? "Authenticating...":"Sign In"}
                        </Button>
                        <p className="text-muted-foreground">{"Don't have an account?"} 
                            <Link href="/register" className="ml-1 hover:underline text-primary font-medium">
                                    Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
        </>
    )
}