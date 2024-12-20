"use client";

import { Menu, MoreVertical, Pencil, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./theme-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, LogOut, Settings, User, FileText } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { get_user } from "@/services/actions/user-action";
import { useEffect, useState } from "react";

interface Props {
  toggleMenu: () => void;
  isShowMenu: boolean;
}

export function Header({ toggleMenu, isShowMenu }: Props) {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await fetch('/api/get-user');
        const {user} = await response.json();
        console.log(user);
        setUsername(user?.username || "Guest");
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUsername("Guest");
      }
    };

    fetchUser();
  }, []);
  return (
    <header className={`sticky top-0 z-10 backdrop-blur-sm bg-white dark:bg-[#151617] w-full  transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            open-note
          </div>
         
        </div>
        {/* Right Section */}

        <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden dark:hover:bg-[#323337] rounded-none"
              onClick={toggleMenu}
            >
             {isShowMenu ? <X size={24} /> :<Menu size={24} /> }
            </Button>
          <div className="hidden lg:flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <span className="sr-only">Profile</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                    {username?.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2" align="end">
                <div className="flex flex-col space-y-1">
                  <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#151617] text-gray-700 dark:text-gray-200" href={"/profile"}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#151617] text-gray-700 dark:text-gray-200" href={"/note/create"}>
                    <Pencil className="w-4 h-4 mr-2" />
                    New Note
                  </Link>
                  {/* <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"/notes"}>
                    <FileText className="w-4 h-4 mr-2" />
                    My Notes
                  </Link> */}
                  <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#151617] text-gray-700 dark:text-gray-200" href={"/setting"}>
                    <Settings className="w-4 h-4 mr-2" />
                    Setting
                  </Link>
                  {/* <Link className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" href={"/notifications"}>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Link> */}
                  <hr className="my-1 border-gray-200 dark:border-gray-600" />
                  <Button className="" variant={"destructive"} onClick={()=>router.push('/logout')}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}