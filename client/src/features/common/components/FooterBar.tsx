import LogoWhite from "../../../assets/LogoWhite.svg"

const FooterBar = () => {
    return (
        <footer className="bg-black text-white flex flex-col md:flex-row items-center justify-between border-t border-gray-600 w-full py-6 md:py-0 md:h-20 gap-4 md:gap-0 px-4 md:px-15 text-center">
            <p className="font-light text-xs order-2 md:order-1">© {new Date().getFullYear()} SOMEWEAR. All Rights Reserved.</p>
            <img src={LogoWhite} className="w-32 md:w-40 object-cover order-1 md:order-2" />
            <p className="font-light text-xs order-3 hidden md:block">Powered By Best Developers in FCIS Ain Shams University</p>
        </footer>
    )
}

export default FooterBar
