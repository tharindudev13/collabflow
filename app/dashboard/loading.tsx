import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";


export const MyProjects = () => {
    return(
        <>
        <div className="flex-9 p-12">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-45 bg-primary/30" />
            <Skeleton className="h-4 w-120 bg-primary/30" />
          </div>
          <Skeleton className="h-9 w-36 bg-primary/30"/>
        </div>
        <div className="flex gap-5 items-center relative mt-12">
           <Skeleton className="h-9 w-150 bg-primary/30" />
           <Skeleton className="h-9 w-36 bg-primary/30" />

        </div>
        <div className="flex justify-between text-muted-foreground text-sm mt-6">
          <Skeleton className="h-4 w-32 bg-primary/30" />
          <Skeleton className="h-4 w-32 bg-primary/30" />
        </div>
        <div className="grid grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((key) => (
                <Card key={key} className="w-full max-w-xs">
                <CardHeader>
                    <Skeleton className="h-4 w-2/3 bg-primary/30" />
                    <Skeleton className="h-4 w-1/2 bg-primary/30" />
                </CardHeader>

                <CardContent>
                    <Skeleton className="aspect-video w-full bg-primary/30" />
                </CardContent>
                </Card>
            ))}
            </div>
      </div>
        </>
    )
}

export default  function Loading(){
    return(
        <>
        <div className="flex h-screen overflow-hidden">
            <div className="flex flex-1 bg-white p-6  flex-col h-full overflow-y-auto">
                <div className="flex-1 gap-3 flex">
                    <Skeleton className="size-10 shrink-0 rounded-lg bg-primary/30"/>

                    <Skeleton className="h-9 w-37.5 bg-primary/30" />
                </div>
                <div className="flex-17">
                    <Skeleton className="h-4 w-37.5 mt-12 bg-primary/30" />


                    <Skeleton className="h-8 w-45 mt-3 bg-primary/30" />

                    <Skeleton className="h-8 w-45 mt-3 bg-primary/30" />

                    <Skeleton className="h-8 w-45 mt-3 bg-primary/30" />

                
                </div>
                <div className="flex-2">
                <Separator className="mb-4"/>

                    <div className="flex gap-4 items-center">
                        <div className="flex w-fit items-center gap-4">
                            <Skeleton className="size-10 shrink-0 rounded-full bg-primary/30"/>
                            <div className="grid gap-2">
                                <Skeleton className="h-4 w-37.5 bg-primary/30" />
                                <Skeleton className="h-4 w-37.5 bg-primary/30" />
                            </div>
                        </div>
        
                    </div>
                    
                </div>

                
            </div>

            <div className="flex flex-col flex-5 bg-accent h-full overflow-y-auto scrollbar-thin">
                <div className=" flex-1 flex bg-[#ffffff] py-4 px-12 justify-between items-center">
                    <Skeleton className="h-4 w-37.5 bg-primary/30"/>

                    <div className="flex gap-5 items-center relative">
                        <Skeleton className="h-8 w-50 bg-primary/30" />

                        <Skeleton className="size-10 shrink-0 rounded-full bg-primary/30"/>

                    </div>
                </div>
               <MyProjects/>
            </div>
            
        </div>
        </>
    )
}