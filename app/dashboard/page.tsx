import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import SignOutButton from "@/components/ui/SignOutButton"
import { redirect } from "next/navigation"

const Dashboard = async() => {
    const session = await auth()
    

    if(!session?.user){
        redirect("/login")
    }
    return(
        <>
        <div>
            Welcome, {session?.user?.name || "User"}!
            <SignOutButton />
        </div>
        
        </>
    )
}

export default Dashboard