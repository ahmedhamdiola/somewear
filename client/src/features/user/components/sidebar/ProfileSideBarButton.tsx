import { type ReactNode } from 'react'
import { SidebarMenuButton } from '../../../../components/ui/sidebar'

interface Props {
    children: ReactNode,
    title: string
    onClick: () => void
    isSelected: boolean
}

const ProfileSideBarButton = ({ children, title, onClick, isSelected }: Props) => {
    return (
        <SidebarMenuButton className={`cursor-pointer ${isSelected ? "bg-black text-white hover:bg-black hover:text-white transition-all active:bg-black active:text-white" : ""}`} onClick={onClick}>
            <div className={`flex justify-center items-center gap-2`}>
                {children}
                <p className='font-normal text-lg'>{title}</p>
            </div>
        </SidebarMenuButton>
    )
}

export default ProfileSideBarButton
