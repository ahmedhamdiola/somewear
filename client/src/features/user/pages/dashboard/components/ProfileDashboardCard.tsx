import { Card, CardContent } from '../../../../../components/ui/card'

interface Props {
    children: React.ReactNode,
    title: string,
    value: string
}
const ProfileDashboardCard = ({ children, title, value }: Props) => {
    return (
        <Card className='shadow-md hover:underline'>
            <CardContent className="flex items-center gap-4 p-6">
                {children}
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-xl font-bold">{value}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileDashboardCard
