import LogoWhite from "../../../assets/LogoWhite.svg"

const FooterBar = () => {
    return (
        <footer className="bg-black h-20 text-white items-center flex justify-between border-t border-gray-600">
            <p className="font-light ml-15 text-xs">© {new Date().getFullYear()} SOMEWEAR. All Rights Reserved.</p>
            <img src={LogoWhite} className="w-40 object-cover" />
            <p className="font-light mr-15 text-xs">Powered By Best Developers in FCIS Ain Shams University</p>
        </footer>
    )
}

export default FooterBar
