import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const Navbar = () => {
    return (
        <div className="bg-background p-7 px-10 flex justify-between sticky top-0 z-50">
            <div className="flex flex-1 gap-8">
                {/* <h1 className="text-2xl text-white font-bold">TechByte</h1> */}
                <Link href='/' className="flex gap-3 items-center justify-between">
                    <img src="/logo_icon.png" alt="Logo Icon" className="w-10" />
                    <img src="/logo_text.png" alt="Logo Icon" className="w-40" />
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="default" className="bg-accent w-30 font-bold tracking-wide">CATALOG</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="[&_*]:text-xl [&_*]:p-3 [&_*]:cursor-pointer">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Sales</DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Laptops</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Apple</DropdownMenuItem>
                                        <DropdownMenuItem>Asus</DropdownMenuItem>
                                        <DropdownMenuItem>Acer</DropdownMenuItem>
                                        <DropdownMenuItem>Lenovo</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Phones</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Apple</DropdownMenuItem>
                                        <DropdownMenuItem>Samsung</DropdownMenuItem>
                                        <DropdownMenuItem>Xiaomi</DropdownMenuItem>
                                        <DropdownMenuItem>Google</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <div className="flex flex-1 justify-center [&_*]:text-primary [&_*]:cursor-pointer">
                <Link href="/">
                    <Button variant="link">Home</Button>
                </Link>
                <Link href='/stores'>
                    <Button variant="link">Stores</Button>
                </Link>
                <Link href='/support'>
                    <Button variant="link">Support</Button>
                </Link>
                <Link href='/about-us'>
                    <Button variant="link">About Us</Button>
                </Link>
            </div>
            <div className="flex flex-1 justify-end">
                <Button variant="default" className="cursor-pointer text-primary">Profile</Button>
            </div>
        </div>
    )
}