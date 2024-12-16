import { X } from 'lucide-react';
import React from 'react'

type Props = {isShowMenu: boolean ,  toggleMenu : ()=>void}
const menu_options = [
    "dashboard", // Overview of all recent notes or activity
    "my-notes",  // Personal notes created by the user
    "shared-with-me", // Notes shared with the user
    "create-note", // Shortcut to create a new note
    "folders", // Organize notes into folders or categories
    "tags", // Manage or browse notes by tags
    "trash", // Deleted notes for recovery or permanent deletion
    "profile", // User profile and account settings
    "settings", // General app or account settings
    "logout", // Log out of the app
  ];
  
function Menu({isShowMenu, toggleMenu}: Props) {
  return (
    <div className={` ${isShowMenu ? "height-fit translate-y-0" : " opacity-0"} fixed top-0 left-0 h-screen w-full transform transition-all duration-300 ease-in-out  bg-opacity-45 font-[BigBlueTerm437NerdFont] bg-red-600 p-3 gap-4 dark:bg-[#18191B]`}>
      {/* <div className={`flex flex-col w-full h-fit  dark:bg-[#18191B] rounded-lg text-center bg-white shadow-lg dark:text-green-500 `}> */}
        <X width={32} height={32} className='ml-auto cursor-pointer mb-10' onClick={toggleMenu}/>
        {menu_options.map((option, key) => (
          <p key={key} className='my-4  px-4 rounded cursor-pointer transition-colors '>
            {option}
          </p>
        ))}
      {/* </div> */}
    </div>
  )
}

export default Menu