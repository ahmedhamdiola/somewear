import Logo from "../../../assets/logo.svg"
import { Separator } from "../../../components/ui/separator"
import CategoriesDropdown from "../../../components/reusableUI/CategoriesDropDown"
import { Link, useNavigate } from "react-router-dom"
import { HeartIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import SearchBar from "./SearchBar";

const NavBar = () => {
    const list = ["Jackets", "Hoodies", "Pants", "T-shirts", "Shorts", "Swimwear"];
    const navigate = useNavigate();

    return (
        <nav className="bg-[#f5f5f5] h-70">
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
                        <UserIcon className="size-8 cursor-pointer" onClick={() => navigate('/profile')} />
                        <HeartIcon className="size-8 cursor-pointer" onClick={() => navigate('/favourites')} />
                        <ShoppingBagIcon className="size-8 cursor-pointer" onClick={() => navigate('/cart')} />
                    </div>
                </div>

                <div className="flex gap-10 text-sm font-light pb-3">
                    <Link to="/">HOME</Link>
                    <Link to="/home">SHOP ALL</Link>
                    <CategoriesDropdown mainCategory="SHOP MEN" list={list} />
                    <CategoriesDropdown mainCategory="SHOP WOMEN" list={list} />
                    <CategoriesDropdown mainCategory="SHOP KIDS" list={list} />
                    <Link to="/contact">CONTACT US</Link>
                </div>

            </div>
            <Separator />
        </nav>
    );
};

export default NavBar;