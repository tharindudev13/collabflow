import { auth } from "@/auth"
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
        </div>
        </>
    )
}

export default Dashboard