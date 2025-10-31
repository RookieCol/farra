import { CalendarDays, Compass, Menu, Ticket, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="flex justify-between px-4 py-6 items-center bg-transparent relative z-50 overflow-visible">
            <Link to="/" className="text-3xl font-bold font-orbitron hover:opacity-80 transition-opacity">
                XXD
            </Link>
            <div className="hidden md:block">
                <ResponsiveMenu />
            </div>
            <button className="md:hidden p-2 relative z-50" onClick={() => setIsOpen(true)}>
                <Menu />
            </button>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div className={`fixed z-[10000] md:hidden h-svh w-[300px] flex flex-col justify-center bg-black top-0 bottom-0 right-0 transition ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="p-2 absolute top-6 right-5 z-10" onClick={() => setIsOpen(false)}><X /></button>
                <ResponsiveMenu />
            </div>
        </nav>
    )
}

function ResponsiveMenu() {
    return (
        <ul className="flex items-center gap-10 md:gap-4 flex-col md:flex-row">
            <li> <Link className="flex gap-1 opacity-50 hover:opacity-100 transition" to="/ticket"><Ticket />  Events</Link></li>
            <li> <a className="flex gap-1 opacity-50 hover:opacity-100 transition" href=""><CalendarDays />  Calendar</a></li>
            <li> <a className="flex gap-1 opacity-50 hover:opacity-100 transition" href=""><Compass />  Discover</a></li>
            <li>
                <ConnectWalletButton />
            </li>
        </ul>
    )
}