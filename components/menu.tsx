import { X } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

type Props = { isShowMenu: boolean, toggleMenu: () => void };

const menu_options = [
  { name: "Profile", href: "/profile" },    // User profile
  { name: "New Note", href: "/note/create" },   // Create a new note
  { name: "Setting", href: "/setting" },   // Application settings
  { name: "Help", href: "/help" },       // Help and support
  { name: "Logout", href: "/logout" }      // Logout from the application
];

function Menu({ isShowMenu, toggleMenu }: Props) {
  return (
    <div className={`fixed top-0 left-0 h-screen w-full transform transition-all duration-300 ease-in-out ${isShowMenu ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} bg-white dark:bg-[#151617] p-4 gap-4 overflow-y-auto mt-5`}>
      <div className="flex justify-end mb-5">
        <X width={32} height={32} className='cursor-pointer text-gray-800 dark:text-gray-200' onClick={toggleMenu} /> 
      </div>
      <div className="flex flex-col items-center space-y-4">
        {menu_options.map((option, key) => (
          <Link key={key} href={option.href}  className='w-full text-center py-3 px-6    dark:bg-[#232426]text-gray-800 dark:text-gray-200  dark:hover:bg-[#323337] transition-colors'>

              {option.name}
       
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;