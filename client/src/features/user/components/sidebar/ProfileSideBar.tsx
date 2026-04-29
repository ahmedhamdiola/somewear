import { Separator } from '../../../../components/ui/separator'
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider } from '../../../../components/ui/sidebar'
import ProfileSideBarButton from './ProfileSideBarButton'
import { options } from "./ProfileSideBarOptions"

interface Props {
    selected: string
    setSelected: (option: string) => void
}
const ProfileSideBar = ({ selected, setSelected }: Props) => {
    return (
        <SidebarProvider>
            <Sidebar className="h-full min-h-screen w-full relative shadow-xl">
                <Separator />
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <p className='font-bold text-xl ml-3 mb-8'>Profile</p>
                        </SidebarMenuItem>
                        {options.map((option, i) => {
                            const Icon = option.Icon
                            return (
                                <SidebarMenuItem key={i} className='cursor-pointer'>
                                    <ProfileSideBarButton title={option.title} onClick={() => setSelected(option.title)} isSelected={selected == option.title}>
                                        <Icon />
                                    </ProfileSideBarButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarHeader>
            </Sidebar>
        </SidebarProvider>
    )
}

export default ProfileSideBar
