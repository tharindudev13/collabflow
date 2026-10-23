"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Register(){
    const [showPwd,setShowPwd] = useState(false)
    return(
        <>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <Card className="w-full max-w-md border-gray-200 shadow-lg pl-2">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold text-primary">
                        Register
                    </CardTitle>
                    <CardDescription className="text-center text-sm">
                        Bring your ideas to life, together.
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent>
                        <div className="space-y-2">
                            <Label className="text-gray-700">Name</Label>
                            <Input 
                                className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                placeholder="John Doe"
                                type="text"
                            />
                            <Label className="text-gray-700">Email</Label>
                            <Input 
                                className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                placeholder="johndoe@example.com"
                                type="text"
                            />
                            <Label className="text-gray-700">Password</Label>
                            <div className="relative">
                                <Input 
                                    className="text-sm border-gray-300 focus:border-primary focus:ring-primary"
                                    placeholder="**********"
                                    type={showPwd? "text" : "password"}
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

                        >
                            Sign Up
                        </Button>
                        <p className="text-muted-foreground">{"Alreadu have an account?"} 
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