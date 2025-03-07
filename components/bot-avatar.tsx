import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

export default function BotAvatar() {
    return <Avatar className="w-12 h-12">
        <AvatarImage src="/logo.avif" alt="B">

        </AvatarImage>
    </Avatar>
}