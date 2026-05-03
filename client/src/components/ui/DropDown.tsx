import { type ReactNode } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu"
import { useNavigate } from "react-router-dom";

interface Props {
    list: string[],
    children: ReactNode
    mainCategory: string
}
export function Dropdown({ list, children, mainCategory }: Props) {
    const navigate = useNavigate();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    {list?.map((category) => (
                        <DropdownMenuItem
                            className="text-sm font-light cursor-pointer"
                            onClick={() => navigate(`/${mainCategory}/${category.toLowerCase()}`)}
                        >{category.toUpperCase()}</DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
