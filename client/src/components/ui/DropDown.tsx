import { type ReactNode } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu"

interface Props {
    list: string[],
    children: ReactNode
}
export function Dropdown({ list, children }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    {list?.map((category) => (
                        <DropdownMenuItem className="text-sm font-light cursor-pointer">{category.toUpperCase()}</DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
