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
        <>
            {/* MOBILE VIEW */}
            <div className="md:hidden flex overflow-x-auto gap-2 p-4 bg-white border-b shadow-sm scrollbar-hide">
                {options.map((option, i) => {
                    const Icon = option.Icon;
                    return (
                        <button
                            key={i}
                            onClick={() => setSelected(option.title)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                                selected === option.title
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {option.title}
                        </button>
                    );
                })}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block h-full">
                <SidebarProvider>
                    <Sidebar className="h-full min-h-screen w-full relative shadow-xl">
                        <Separator />
                        <SidebarHeader>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <p className='font-bold text-xl ml-3 mb-8 mt-4'>Profile</p>
                                </SidebarMenuItem>
                                {options.map((option, i) => {
                                    const Icon = option.Icon
                                    return (
                                        <SidebarMenuItem key={i} className='cursor-pointer'>
                                            <ProfileSideBarButton
                                                title={option.title}
                                                onClick={() => setSelected(option.title)}
                                                isSelected={selected == option.title}
                                            >
                                                <Icon />
                                            </ProfileSideBarButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarHeader>
                    </Sidebar>
                </SidebarProvider>
            </div>
        </>
    )
}

export default ProfileSideBar
