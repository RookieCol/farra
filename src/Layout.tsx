import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <main className='min-h-svh w-full flex flex-col'>
            <Navbar />
            <div className='flex-1 flex flex-col min-h-0 overflow-auto'>
                <Outlet />
            </div>
        </main>
    )
}

export default Layout
