"use client"
import { cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, Music4Icon, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";




const montserrat=Montserrat({ weight:"600",subsets: ["latin"] });



export default function Sidebar(){
    const pathnames =usePathname();
    const routes=[{
        label:"Dashboard",
        icon:LayoutDashboard,
        href:'/dashboard',
        color:"text-sky-700"
    },{
        label:"Image Generation",
        icon:ImageIcon,
        href:'/image-generation',
        color:"text-yellow-700"

    },{
        label:"Conversation",
        icon:MessageSquare,
        href:'/conversation',
        color:"text-purple-700"

    },
    {
        label:"Video Generation",
        icon:VideoIcon,
        href:'/video-generation',
        color:"text-red-700"

    },{
        label:"MusicGeneration",
        icon:Music4Icon,
        href:'/music-generation',
        color:"text-green-700"

    },{
        label:"CodeGeneration",
        icon:CodeIcon,
        href:'/code-generation',
        color:"text-orange-700"

    },{
        label:"Settings",
        icon:Settings,
        href:'/settings',
        

    }]
    return(
    <div className="space-y-4 py-4 flex flex-col h-full ">
    <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
        <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/">

            </Image>

        </div>
        <h1 className={cn("text-2xl font-bold",montserrat.className)}>
            AI-SAAS

        </h1>
        
        </Link>
        <div className="space-y-1 ">
            {routes.map((route)=>{
return(<Link href={route.href} key={route.label} className={cn("text-sm group flex p-3 w-70 justify-start font-medium cursor-pointer  hover:text-white hover:bg-white/10 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-grey-500 ...", pathnames===route.href?"text-white bg-white/10": "text-zinc-400" )}>
    <div className="flex items-center   flex-1">
        <route.icon className={cn("h-5 w-5 mr-3",route.color)}/>
        {route.label}
    </div>
</Link>)
            })}
 

        </div>
    </div>

    </div>
    
        );
}