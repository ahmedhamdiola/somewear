import { ChartPieIcon, LogOutIcon, Settings, ShoppingBasketIcon } from 'lucide-react'

interface optionsAttributes {
    title: string,
    Icon: React.ElementType
}

export const options: optionsAttributes[] = [
    {
        title: "Dashboard",
        Icon: ChartPieIcon
    },
    {
        title: "Settings",
        Icon: Settings
    },
    {
        title: "My Orders",
        Icon: ShoppingBasketIcon
    },
    {
        title: "Log Out",
        Icon: LogOutIcon
    }

]