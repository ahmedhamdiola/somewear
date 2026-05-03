import NavBar from '../components/navbar/NavBar'
import FooterBar from '../components/FooterBar'
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid'

const NotFoundPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex justify-center flex-col w-full items-center flex-1">
                <ExclamationTriangleIcon className='size-40' />
                <p className="text-lg font-semibold">No products found</p>
                <p className="text-sm">Try a different search term or category.</p>
            </div>
            <FooterBar />
        </div>
    )
}

export default NotFoundPage
