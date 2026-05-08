import { type ReactNode } from 'react'
import { Card, CardContent } from '../../../components/ui/card'

interface Props {
    children: ReactNode
    message: string
}


const EmptyCard = ({ message, children }: Props) => {
    return (
        <div className="min-h-screen">
            <Card className="text-center py-20 w-full">
                <CardContent>
                    {children}
                    <p className="text-zinc-500 text-lg">{message}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmptyCard
