"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'


const SignOutButton = () => {
    
    return (
        <Button onClick={async() => await signOut()}>
                Sign Out
        </Button>
    )
}

export default SignOutButton