import Image from "next/image";
import Logo from "../public/Primary.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Circle, Diamond, EllipsisIcon, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "@/components/ui/SignOutButton";

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col pt-20">
      <div className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-background px-20">
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="CollabFlow"
            width={35}
            height={35}
            className="rounded-lg shrink-0 self-start object-contain"
          />
          <h1 className=" text-2xl font-bold">
            Collab<span className="text-primary">Flow</span>{" "}
          </h1>
        </div>
        <div className="flex gap-10 items-center">
          <p className="text-muted-foreground">Features</p>
          <p className="text-muted-foreground">How it works</p>
          <p className="text-muted-foreground">About</p>

            {!session?.user ?
            <>
              <Button variant="ghost" className="p-5 font-bold">
                  <Link href="/login">Login</Link>
              </Button>
              <Button className="p-5 flex">
                <Link href="/login">Get Started</Link> <ArrowRight />
              </Button>
            </>
              :
              <SignOutButton />
            }
            
          
        </div>
      </div>
      <div className="flex-7 flex bg-accent px-20 py-10 justify-between">
        <div className="flex-1">
          <p className="mt-8 uppercase flex bg-primary/30 w-fit p-3 text-sm text-primary font-bold rounded-4xl">
            Your work, beautifully in sync
          </p>
          <p className="mt-10 font-bold text-6xl">Great work happens</p>
          <p className="mt-5 font-bold text-6xl text-primary">together.</p>

          <p className="mt-5 text-muted-foreground">
            Turn ideas into progress. Bring projects,tasks and <br />
            your team together in one beuatifully simple space.
          </p>

          <div className="flex mt-10 gap-3">
            <Button className="py-6 px-4 font-semibold cursor-pointer">
              <Link href="/dashboard">
                Start Collabarating 
              </Link>
              <ArrowRight />
            </Button>
            <Button className="py-6 px-4 font-semibold" variant="outline">
              Explore features
            </Button>
          </div>

          <div className="flex text-sm text-muted-foreground mt-8 gap-10">
            <p className="flex items-center">
              <Check size={15} /> Simple to start
            </p>
            <p className="flex items-center">
              <Check size={15} /> Built for teamwork
            </p>
          </div>
        </div>
        <div className="flex-1 relative">
           <div className="absolute h-105 w-105 right-28 -top-5 rounded-full bg-primary/30" />
          <Card className="relative z-10 w-fit mt-8">
            <CardHeader>
              <div className="justify-between flex">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="relative flex h-6 w-6 items-center justify-center">
                      <Diamond size={20} strokeWidth={1.8} />

                      <Diamond size={8} strokeWidth={2} fill="black" className="absolute" />
                    </div>
                   <p className="font-bold">Product Launch</p>
                  </CardTitle>
                </div>
                <div>
                  <EllipsisIcon />
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent>
              <p className="uppercase text-muted-foreground text-xs font-bold mt-2">project overview</p>
              <p className="text-xl font-bold mt-2">Make every idea count.</p>
              <div className="flex justify-between mt-5 gap-5">
                  <div className="bg-[#F0EBFF] rounded-lg p-3 w-40 py-5">
                    <p className="text-[#7655DE] text-xl font-bold">12</p>
                    <p className="text-[#7F7A95] text-xs">In progress</p>
                  </div>
                  <div className="bg-[#E9F9F0] rounded-lg p-3 w-40 py-5">
                    <p className="text-[#25956B] text-xl font-bold">28</p>
                    <p className="text-[#7F7A95] text-xs">Completed</p>
                  </div>
                  <div className="bg-[#FFF1E9] rounded-lg p-3 w-40 py-5">
                    <p className="text-[#C4774D] text-xl font-bold">06</p>
                    <p className="text-[#7F7A95] text-xs">Team Members</p>
                  </div>
              </div>
              <p className="uppercase font-bold text-muted-foreground mt-5"> up next</p>
              <div className="bg-[#FAF9FF] flex mt-3 justify-between p-2 rounded-lg pr-5">
                <div className="flex items-center gap-2">
                  <Circle stroke="0" className="fill-[#F0EBFF]"/>
                  <p>Finalize landing page design</p>
                </div>
                <p className="text-primary font-semibold">Today</p>
              </div>
              <div className="bg-[#FAF9FF] flex mt-3 justify-between p-2 rounded-lg pr-5">
                <div className="flex items-center gap-2">
                  <Circle stroke="0" className="fill-[#E9F9F0]"/>
                  <p>Review project milestones</p>
                </div>
                <p className="text-[#7F7A95]/90 font-semibold">Tomorrow</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
      <div className="flex-2 px-20 py-10">
        <p className="font-bold text-lg">Everything your team needs to move forward</p>
        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center bg-primary/30 rounded-md">
                      <Circle size={20} strokeWidth={1.5} className="stroke-primary"/>

                      <Circle size={15} strokeWidth={2}  className="absolute stroke-primary" />
                </div>
                <div>
                  <p className="font-bold">Stay Organized</p>
                  <p className="text-muted-foreground">Projects and tasks in one place</p>
                </div>
          </div>
          <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center bg-primary/30 rounded-md">
                      <Users size={20} strokeWidth={1.5} className="stroke-primary"/>
                </div>
                <div>
                  <p className="font-bold">Work together</p>
                  <p className="text-muted-foreground">Keep every one on the same page</p>
                </div>
          </div>
          <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center bg-primary/30 rounded-md">
                      <ArrowUpRight size={20} strokeWidth={1.5} className="stroke-primary"/>
                </div>
                <div>
                  <p className="font-bold">Make progress</p>
                  <p className="text-muted-foreground">Focus on what matters most</p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
