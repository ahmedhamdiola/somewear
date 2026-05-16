import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

interface Props {
    label: string;
    items: string[];
    mainCat: string;
    onNav: (path: string) => void;
}

const MobileAccordion = ({ label, items, mainCat, onNav }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-100">
            <button
                className="w-full flex items-center justify-between px-6 py-3 font-medium hover:bg-gray-50 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {label}
                <ChevronDownIcon className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="flex flex-col bg-gray-50">
                    {items.map((sub) => (
                        <p
                            key={sub}
                            onClick={() => onNav(`/${mainCat}/${sub.toLowerCase()}`)}
                            className="cursor-pointer px-10 py-2 hover:bg-gray-100 text-gray-700 uppercase text-xs tracking-wide"
                        >
                            {sub}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileAccordion;
