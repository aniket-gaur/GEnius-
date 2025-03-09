


import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server"
import { ArrowRight, CodeIcon, ImageIcon, MessageSquare, VideoIcon } from "lucide-react";
import Link from "next/link";


export default async function Dashboard() {
  const user = await currentUser();

  const tools = [{
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet/10",
    href: "/conversation",

  }, {

    label: "Image Generation",
    icon: ImageIcon,
    color: "text-violet-500",
    bgColor: "bg-violet/10",
    href: "/image-generation",

  }, {

    label: "Video Generation",
    icon: VideoIcon,
    color: "text-violet-500",
    bgColor: "bg-violet/10",
    href: "/video-generation",




  }, {

    label: "Code Generation",
    icon: CodeIcon,
    color: "text-violet-500",
    bgColor: "bg-violet/10",
    href: "/code-generation",
  }]


  return <>
    <div>

      <div className=" flex items-center justify-center flex-col mb-8 space-y-4 ">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the Power of AI
        </h2>
        <p>
          Welcome to World of AI and Lets Enjoys with the Technology of Ai
        </p>
        <span className="font-bold text-3xl space-x-2 text-center"> USER-NAME: {user?.username} </span>
        <div className="flex flex-col gap-y-4">

          {tools.map((tool) => (

            <Link href={tool.href}>
              <Card key={tool.href}


                className="p-2 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer gap-x-4  ">


                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8 ", tool.color)} />


                  </div>
                  <div className="font-semibold">
                    {tool.label}
                  </div>

                </div>



                <ArrowRight />

              </Card>

            </Link>

          ))}
        </div>



      </div>

    </div>

  </>



}
