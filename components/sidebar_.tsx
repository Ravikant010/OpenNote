// 'use client'

// import * as React from "react"
// import { Home, Settings, Users } from 'lucide-react'

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"

// const menuItems = [
//   { icon: Home, label: "Home", href: "/" },
//   { icon: Users, label: "Users", href: "/users" },
//   { icon: Settings, label: "Settings", href: "/settings" },
// ]

// export function NoteSidebar() {
//   return (
//     <div className="relative">
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-4">
//         <h2 className="text-xl font-bold">My App</h2>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarMenu>
//           {menuItems.map((item) => (
//             <SidebarMenuItem key={item.label}>
//               <SidebarMenuButton asChild tooltip={item.label}>
//                 <a href={item.href}>
//                   <item.icon className="h-4 w-4" />
//                   <span>{item.label}</span>
//                 </a>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton tooltip="Log out">
//               <span>Log out</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//     </div>
//   )
// }

"use client";

import React, { useState } from "react";
import { Menu, X, LayoutDashboard, FolderKanban, Settings, Users, Bell, Search, HelpCircle } from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", color: "bg-blue-500/10 text-blue-500" },
    { icon: FolderKanban, label: "Projects", color: "bg-green-500/10 text-green-500" },
    { icon: Users, label: "Team", color: "bg-purple-500/10 text-purple-500" },
    { icon: Bell, label: "Notifications", color: "bg-yellow-500/10 text-yellow-500" },
    { icon: Settings, label: "Settings", color: "bg-pink-500/10 text-pink-500" },
    { icon: HelpCircle, label: "Help Center", color: "bg-teal-500/10 text-teal-500" },
  ];

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-80" : "w-20"
        } bg-white border-r border-gray-200 relative transition-all duration-300 ease-in-out flex flex-col h-full`}
      >
        {/* Logo and Toggle Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-semibold text-gray-800">Bolt UI</span>
            </div>
          ) : (<></>
            // <div className="h-8 w-8 mx-auto rounded-lg bg-blue-600 flex items-center justify-center">
            //   <span className="text-white font-bold text-xl">B</span>
            // </div>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Search Bar */}
        {isSidebarOpen && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 group ${
                  index === 0 ? "bg-gray-50" : ""
                }`}
              >
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon size={18} />
                </div>
                {isSidebarOpen && (
                  <span className={`text-gray-700 font-medium ${index === 0 ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-gray-200"
            />
            {isSidebarOpen && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800">John Doe</h4>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </header>
        <main className="p-6">
          <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Card {item}</h3>
                <p className="text-gray-600">
                  This is a sample card in the main content area. You can add your actual content here.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}