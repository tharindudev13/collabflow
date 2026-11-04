import { auth } from "@/auth"
import { buttonVariants } from "@/components/ui/button"
import SignOutButton from "@/components/ui/SignOutButton"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function HomeAuthActions() {
  const session = await auth()

  if (session?.user) {
    return <SignOutButton />
  }

  return (
    <>
      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
        Login
      </Link>

      <Link href="/login" className={buttonVariants()}>
        Get Started <ArrowRight />
      </Link>
    </>
  )
}