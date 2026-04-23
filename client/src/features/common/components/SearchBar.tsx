import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchOpen) inputRef.current?.focus();
    }, [searchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchOpen(false);
        setSearchQuery("");
    };

    const handleClose = () => {
        setSearchOpen(false);
        setSearchQuery("");
    };

    if (!searchOpen) return (
        <MagnifyingGlassIcon
            className="size-10 cursor-pointer shrink-0 hover:opacity-50 transition-opacity"
            onClick={() => setSearchOpen(true)}
        />
    );

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="flex items-center border-b-2 border-black bg-transparent">
                <MagnifyingGlassIcon className="size-5 shrink-0 text-gray-500" />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent outline-none px-2 py-1 text-sm w-48 placeholder:text-gray-400"
                />
            </div>
            <button type="button" onClick={handleClose} className="cursor-pointer hover:opacity-50 transition-opacity">
                <X className="size-4" />
            </button>
        </form>
    );
};

export default SearchBar;