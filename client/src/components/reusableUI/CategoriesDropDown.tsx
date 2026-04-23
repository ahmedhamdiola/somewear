import { Dropdown } from '../ui/DropDown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface Props {
    mainCategory: string
    list: string[],
}
const CategoriesDropDown = ({ mainCategory, list }: Props) => {
    return (
        <div className="cursor-pointer flex">
            <Dropdown list={list} >
                <div className="flex">
                    <p className="font-light cursor-pointer hover:font-medium">{mainCategory}</p>
                    <ChevronDownIcon className="size-5 text-gray-600" />
                </div>
            </Dropdown>
        </div>
    )
}

export default CategoriesDropDown
