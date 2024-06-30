import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
            <main className='min-h-svh flex flex-col'>
            <Navbar />

                <Outlet />
            </main>
    )
}

export default Layout