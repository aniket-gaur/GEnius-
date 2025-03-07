import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps{
    title:String,
    description:String,
    color?:string,
    icon:LucideIcon,
    bgColor?:string,


}

export default function Heading({
    title,
    description,
    color,
    icon:Icon,
    bgColor
}:HeadingProps){
    return(
       <>
       <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md",bgColor)}>
            <Icon className={cn("w-8 h-8",color)}/>

        </div>
        <div>
        <h2 className="text-3xl font-semibold">
            {title}
        </h2>
        <p className="font-[300]"> {description}</p>
       </div>

       </div>
       
       
       </>
    )
}