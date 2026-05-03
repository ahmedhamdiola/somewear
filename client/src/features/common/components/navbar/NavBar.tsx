import Logo from "../../../../assets/logo.svg"
import { Separator } from "../../../../components/ui/separator"
import CategoriesDropdown from "../../../../components/reusableUI/CategoriesDropDown"
import { useNavigate } from "react-router-dom"
import { ShoppingBagIcon, UserIcon } from "lucide-react";
import SearchBar from "../SearchBar";
import useCategories from "./hooks/useCategories";

const NavBar = () => {
    const { categories } = useCategories()

    const menCategories = categories
        .filter((cat) => cat.category.trim() === "Men")
        .map((cat) => cat.subcategory);

    const womenCategories = categories
        .filter((cat) => cat.category.trim() === "Women")
        .map((cat) => cat.subcategory);

    const kidsCategories = categories
        .filter((cat) => cat.category.trim() === "Kids")
        .map((cat) => cat.subcategory);
    const navigate = useNavigate();


    return (
        <nav className="bg-[#f5f5f5] h-55 shadow-sm">
            <div className="flex justify-center items-center h-full flex-col">

                <div className="flex items-center justify-between w-full px-6 flex-1">
                    <div className="w-64 ml-20">
                        <SearchBar />
                    </div>
                    <img
                        src={Logo}
                        className="h-14 object-contain cursor-pointer mr-50"
                        onClick={() => navigate('/')}
                    />
                    <div className="flex items-center gap-5">
                        <UserIcon className="size-8 cursor-pointer hover:opacity-50" onClick={() => navigate('/profile')} />
                        <ShoppingBagIcon className="size-8 cursor-pointer hover:opacity-50" onClick={() => navigate('/cart')} />
                    </div>
                </div>

                <div className="flex gap-10 text-sm font-light pb-3">
                    <p onClick={() => navigate('/')} className="cursor-pointer hover:font-medium">HOME</p>
                    <p onClick={() => navigate('/products')} className="cursor-pointer hover:font-medium">SHOP ALL</p>
                    <CategoriesDropdown mainCategory="SHOP MEN" list={menCategories} />
                    <CategoriesDropdown mainCategory="SHOP WOMEN" list={womenCategories} />
                    <CategoriesDropdown mainCategory="SHOP KIDS" list={kidsCategories} />
                    <p onClick={() => navigate('/contact')} className="cursor-pointer hover:font-medium">CONTACT US</p>
                </div>

            </div>
            <Separator />
        </nav>
    );
};

export default NavBar;