import { useState } from "react"
import Logo from "../../../../assets/logo.svg"
import { Separator } from "../../../../components/ui/separator"
import CategoriesDropdown from "../../../../components/reusableUI/CategoriesDropDown"
import { useNavigate } from "react-router-dom"
import { ShoppingBagIcon, UserIcon, MenuIcon, XIcon } from "lucide-react";
import SearchBar from "../SearchBar";
import useCategories from "./hooks/useCategories";
import MobileAccordion from "./MobileAccordion";

const NavBar = () => {
    const { categories } = useCategories()
    const [menuOpen, setMenuOpen] = useState(false)

    const menCategories = categories
        .filter((cat) => cat.category.trim().toLowerCase() === "men")
        .map((cat) => cat.subcategory);

    const womenCategories = categories
        .filter((cat) => cat.category.trim().toLowerCase() === "women")
        .map((cat) => cat.subcategory);

    const kidsCategories = categories
        .filter((cat) => cat.category.trim() === "Kids")
        .map((cat) => cat.subcategory);

    const navigate = useNavigate();

    const handleNav = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    }

    return (
        <nav className="bg-[#f5f5f5] shadow-sm">
            {/* ── TOP ROW ── */}
            <div className="flex items-center justify-between px-4 md:px-6 h-16 md:h-20">

                {/* Search — hidden on mobile */}
                <div className="hidden md:block w-64">
                    <SearchBar />
                </div>

                {/* Logo */}
                <img
                    src={Logo}
                    className="h-10 md:h-14 object-contain cursor-pointer mx-auto md:mx-0 md:mr-50"
                    onClick={() => navigate('/')}
                />

                {/* Icons */}
                <div className="flex items-center gap-3 md:gap-5">
                    <UserIcon className="size-6 md:size-8 cursor-pointer hover:opacity-50" onClick={() => navigate('/profile')} />
                    <ShoppingBagIcon className="size-6 md:size-8 cursor-pointer hover:opacity-50" onClick={() => navigate('/cart')} />
                    {/* Hamburger — mobile only */}
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen
                            ? <XIcon className="size-6" />
                            : <MenuIcon className="size-6" />
                        }
                    </button>
                </div>
            </div>

            {/* Search bar on mobile — below top row */}
            <div className="md:hidden px-4 pb-3">
                <SearchBar />
            </div>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex gap-10 text-sm font-light pb-3 justify-center">
                <p onClick={() => navigate('/')} className="cursor-pointer hover:font-medium">HOME</p>
                <p onClick={() => navigate('/products')} className="cursor-pointer hover:font-medium">SHOP ALL</p>
                <CategoriesDropdown mainCategory="SHOP MEN" list={menCategories} />
                <CategoriesDropdown mainCategory="SHOP WOMEN" list={womenCategories} />
                <CategoriesDropdown mainCategory="SHOP KIDS" list={kidsCategories} />
                <p onClick={() => navigate('/contact')} className="cursor-pointer hover:font-medium">CONTACT US</p>
            </div>

            {/* ── MOBILE MENU ── */}
            {menuOpen && (
                <div className="md:hidden flex flex-col text-sm font-light border-t border-gray-200 bg-white shadow-lg">
                    <p onClick={() => handleNav('/')} className="cursor-pointer hover:bg-gray-50 px-6 py-3 border-b border-gray-100 font-medium">HOME</p>
                    <p onClick={() => handleNav('/products')} className="cursor-pointer hover:bg-gray-50 px-6 py-3 border-b border-gray-100 font-medium">SHOP ALL</p>

                    <MobileAccordion
                        label="SHOP MEN"
                        items={menCategories}
                        mainCat="men"
                        onNav={handleNav}
                    />
                    <MobileAccordion
                        label="SHOP WOMEN"
                        items={womenCategories}
                        mainCat="women"
                        onNav={handleNav}
                    />
                    <MobileAccordion
                        label="SHOP KIDS"
                        items={kidsCategories}
                        mainCat="kids"
                        onNav={handleNav}
                    />

                    <p onClick={() => handleNav('/contact')} className="cursor-pointer hover:bg-gray-50 px-6 py-3 font-medium">CONTACT US</p>
                </div>
            )}

            <Separator />
        </nav>
    );
};

export default NavBar; 