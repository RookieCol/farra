import { CalendarDays, Compass, Menu, Ticket, X } from "lucide-react";
import { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="flex justify-between px-4 py-6 items-center bg-transparent relative z-10 overflow-visible">
            <h1 className="text-3xl font-bold font-orbitron">XXD</h1>
            <div className="hidden md:block">
                <ResponsiveMenu />
            </div>
            <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
                <Menu />
            </button>
            <div className={`fixed z-50 md:hidden h-svh w-[300px] flex flex-col justify-center bg-black top-0 bottom-0 right-0 transition ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="p-2 absolute top-6 right-5" onClick={() => setIsOpen(false)}><X /></button>

                <ResponsiveMenu />
            </div>
        </nav>
    )
}

function ResponsiveMenu() {
    return (
        <ul className="flex items-center gap-10 md:gap-4 flex-col md:flex-row">
            <li> <a className="flex gap-1 opacity-50 hover:opacity-100 transition" href="/ticket"><Ticket />  Events</a></li>
            <li> <a className="flex gap-1 opacity-50 hover:opacity-100 transition" href=""><CalendarDays />  Calendar</a></li>
            <li> <a className="flex gap-1 opacity-50 hover:opacity-100 transition" href=""><Compass />  Discover</a></li>
            <li>
                <ConnectWalletButton />
            </li>
        </ul>
    )
}