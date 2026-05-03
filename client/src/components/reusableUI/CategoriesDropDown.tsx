import { Dropdown } from '../ui/DropDown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface Props {
    list: string[],
    mainCategory: string
}
const CategoriesDropDown = ({ mainCategory, list }: Props) => {
    const isMenCategory = mainCategory.toLowerCase().includes("men")
    const isWomenCategory = mainCategory.toLowerCase().includes("women")
    const isKidsCategory = mainCategory.toLowerCase().includes("kids")
    return (
        <div className="cursor-pointer flex">
            <Dropdown
                list={list}
                mainCategory={
                    isWomenCategory ? "women" :
                        isMenCategory ? "men" :
                            isKidsCategory ? "kids" :
                                "none"
                }>
                <div className="flex">
                    <p className="font-light cursor-pointer hover:font-medium">{mainCategory}</p>
                    <ChevronDownIcon className="size-5 text-gray-600" />
                </div>
            </Dropdown>
        </div>
    )
}

export default CategoriesDropDown
