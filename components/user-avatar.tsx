import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function UserAvatar() {
    const user = useUser();
    return <Avatar className="h-12 w-12">
        <AvatarImage src={user?.user?.imageUrl} />
        <AvatarFallback>
            {user?.user?.firstName?.charAt(0)}
            {user?.user?.lastName?.charAt(0)}
        </AvatarFallback>
    </Avatar>

}