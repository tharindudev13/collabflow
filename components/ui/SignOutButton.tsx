"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'


const SignOutButton = () => {
    
    return (
        <Button variant="destructive" className="font-bold cursor-pointer" onClick={async() => await signOut({ callbackUrl: "/login" })}>
                LogOut
        </Button>
    )
}

export default SignOutButton