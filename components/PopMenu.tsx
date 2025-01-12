"use client";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Import Popover components
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
import { UserIcon, User, FilePlus, Settings, LogOut } from "lucide-react"; // Import Lucide icons
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

type Props = { userId: number };

export default function PopMenu({ userId }: Props) {
    const router = useRouter()
    const navigate = (path:string)=>{
        return router.push(path)
    }
  return (
    <div>
      {userId && (
        <Popover>
          {/* Trigger */}
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
            
              size="icon"
              className="rounded-full hover:bg-gray-100 transition-colors"
            >
              <UserAvatar className="h-10 w-10" />
            </Button>
          </PopoverTrigger>

          {/* Popover Content */}
          <PopoverContent className="p-2 bg-white shadow-lg rounded-md w-56 border border-gray-100">
            <div className="flex flex-col space-y-1">
              {/* Profile */}
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                onClick={()=>navigate("/profile")}
              >
                <User className="w-4 h-4 mr-2 text-gray-600" />
                <span>Profile</span>
              </Button>

              {/* Create Note */}
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                onClick={()=>navigate("/note/create")}
              >
                <FilePlus className="w-4 h-4 mr-2 text-gray-600" />
                <span>Create Note</span>
              </Button>

              {/* Settings */}
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                onClick={()=>navigate("/setting")}
              >
                <Settings className="w-4 h-4 mr-2 text-gray-600" />
                <span>Settings</span>
              </Button>

              {/* Logout */}
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                onClick={()=>navigate("/logout")}
              >
                <LogOut className="w-4 h-4 mr-2 text-gray-600" />
                <span>Logout</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}