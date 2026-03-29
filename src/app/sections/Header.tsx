"use client"
import AnimatedButton from '@/components/ui/animated-button'
import { House } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const linkItems = [
    { name: 'Home', href: '/' },
    { name: 'For Hosts', href: '/for-hosts' },
    { name: 'For Cleaners', href: '/for-cleaners' },
    { name: 'About us', href: '/about' },
    { name: 'Contact us', href: '/contact' },
  ]
  return (
    <div className="bg-[#0088FF] w-full px-2 h-16 flex items-center justify-center">
      <nav className="flex items-center container mx-auto justify-between text-slate-100">
        {/* logo */}
        <div id="menu" className={`${mobileOpen ? 'max-md:left-0' : 'max-md:-left-full'} max-md:fixed max-md:bg-black/70 max-md:backdrop-blur max-md:top-0 transition-all duration-300 max-md:h-screen max-md:w-full max-md:z-50 max-md:justify-center flex-col md:flex-row flex items-center gap-2 text-sm`}>
          {linkItems.map((item) => (
            <Link key={item.name} className="px-4 py-2  text-slate-100 hover:text-slate-200" href={item.href} onClick={() => setMobileOpen(false)}>{item.name}</Link>
          ))}
          <button onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">
          <svg className="size-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden md:block">
          <AnimatedButton
            isIconOnly={true}
            icon={<House size={20} color='white' />}
            buttonText="Become a House keeper" variant="secondary" />
        </div>
      </nav>
    </div>
  )
}

export default Header
