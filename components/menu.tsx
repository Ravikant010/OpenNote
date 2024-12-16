import { X } from 'lucide-react';
import React from 'react'

type Props = {isShowMenu: boolean ,  toggleMenu : ()=>void}
const menu_options = [
    "background", // Change background color
    "bold",      // Toggle bold text
    "color",     // Change text color
    "font",      // Change font family
    "code",      // Toggle code format
    "italic",    // Toggle italic text
    "link",      // Insert/edit link
    "size",      // Change font size
    "strike",    // Toggle strikethrough
    "script",    // Sub/superscript
    "underline", // Toggle underline
    "blockquote", // Toggle blockquote
    "header",    // Add heading
    "indent",    // Adjust indentation
    "list",      // Toggle list (ordered/bullet)
    "align",     // Text alignment
    "direction", // Text direction
    "code-block", // Toggle code block
    "formula",   // Insert formula
    "image",     // Insert image
    "video"      // Insert video
];
  
function Menu({isShowMenu, toggleMenu}: Props) {
  return (
    <div className={` ${isShowMenu ? "height-fit translate-y-0" : " opacity-0"} fixed top-0 left-0 h-screen w-full transform transition-all duration-300 ease-in-out   font-[BigBlueTerm437NerdFont] bg-[#F2F5F3] p-3 gap-4 dark:bg-[#151617] overflow-y-auto`}>
      {/* <div className={`flex flex-col w-full h-fit  dark:bg-[#18191B] rounded-lg text-center bg-white shadow-lg dark:text-green-500 `}> */}
        <X width={32} height={32} className='ml-auto cursor-pointer mb-5' onClick={toggleMenu}/>
        {menu_options.map((option, key) => (
          <p key={key} className='my-4    cursor-pointer transition-colors dark:bg-[#232426] px-3 py-2 rounded-2xl w-fit shadow-sm bg-[#FDFEFD] dark:text-[#DFE1E2] '>
            {option}
          </p>
        ))}
      {/* </div> */}
    </div>
  )
}

export default Menu