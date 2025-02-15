"use client"
import Link from 'next/link'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const removeNav = ["/login", "/register"]
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    {!(removeNav.includes(pathname))&& 
    <nav
      className={`fixed top-0 left-0 w-full p-3 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-[var(--background)]' : 'bg-[var(--sky)]'
      }`}
        style={{ zIndex: "1000"}}>
      <div className="flex justify-between items-center">
        <div className="text-white font-bold"><img src="logo.png" className='w-[4rem] h-[4rem]'></img></div>
        <ul className="flex space-x-4">
          <li className="text-white"><Link href="/login"><button className='bg-[var(--background)] p-5 rounded-xl'>Login</button></Link></li>
        </ul>
      </div>
    </nav>}
    
    </>
  );
}