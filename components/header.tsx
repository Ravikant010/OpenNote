"use client"

import { MoreVertical, Pencil, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./theme-toggle"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, LogOut, Settings, User, FileText, Share2 } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
interface Props{
  toggleMenu : ()=>void
  isShowMenu: boolean
}
export function Header({toggleMenu, isShowMenu}:Props) {
  return ( 
    <header className={`sticky top-0 z-10 backdrop-blur-sm bg-[#FDFEFD] dark:bg-[#18191B] w-full rounded-lg ${isShowMenu ? "hidden" : "flex"} transition-all duration-300 ease-in-out`} >
      <div className="p-3 flex lg:flex-col w-full max-w-screen-2xl mx-auto md:flex-row md:items-center md:p-4 md:gap-6 gap-4  ">
        {/* Left Section */}
        <div className="flex items-center w-full gap-3  py-2 font-[BigBlueTerm437NerdFont]">
          open-note
        </div>
        <div className="lg:flex items-center w-full gap-3 hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <span className="sr-only">Menu</span>
            <MoreVertical className="h-5 w-5" />
          </Button>
         
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <Input
              className="w-full pl-10 bg-zinc-100 dark:bg-zinc-800/50 border-none text-sm rounded-full"
              placeholder="Search your notes"
            />
          </div>
        </div>
<div className="flex items-center gap-3 justify-en" onClick={toggleMenu}>
<Image width={20} height={20} src={"/Hamburger-Menu.png"} alt="menu-icon"/>
</div>
        {/* Right Section */}
        <div className="lg:flex items-center gap-3 justify-end hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                size="icon" 
                className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <span className="sr-only">Profile</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2" align="end">
              <div className="flex flex-col space-y-1">
                <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"/profile"}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
                <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"create-note"}>
                  <Pencil className="w-4 h-4 mr-2" />
                  New Note
                </Link>
                <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"/notes"}>
                  <FileText className="w-4 h-4 mr-2" />
                  My Notes
                </Link>
                <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"/settings"}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
                <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"/notifications"}>
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-600" />
                <button className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </button>
              </div>
            </PopoverContent>
          </Popover>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}