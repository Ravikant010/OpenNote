// "use client";
// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "./ui/badge";
// import { get_user_by_id } from "@/services/actions/User";
// import { User } from "@/db/schema";
// import DOMPurify from "dompurify";
// import { useRouter } from "next/navigation";
// export const NoteCard: React.FC<{
//   project: {
//     title: string;
//     description: string;
//     userId: number;
//     category: string;
//     note_id:number
//   };
// }> = ({ project }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const userData = await get_user_by_id(project.userId);
//         if (userData) {
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };

//     getUser();
//   }, [project.userId]);

//   // Sanitize the description
//   const sanitizedDescription = DOMPurify.sanitize(
//     project.description || "No description available."
//   );
// const router = useRouter()
//   return (
//     <Card className="flex-1 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02]" >
//       <div className="flex flex-col space-y-4">
//         {/* User Info */}
      
//           {user?.avatar ? (
//               <div className="flex items-center space-x-3">
//             <Avatar>
//               <AvatarImage src={user?.avatar || ""} />
//               <AvatarFallback>
//                 {user?.username?.charAt(0).toUpperCase() || "U"}
//               </AvatarFallback>
//             </Avatar>
//               <span className="text-sm font-medium text-gray-800">
//               {user?.username || "Unknown User"}
//             </span>
//             </div>
//           ) : (
//             <div className="animate-pulse">
//               <div className="h-10 w-10 rounded-full bg-gray-200" />
//             </div>
//           )}

        


//         {/* Project Title and Description */}
//         <div className="flex flex-col gap-2">
//           {/* Title with single line clamp */}
//           <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
//             {project.title}
//           </h3>

//           {/* Description with responsive line clamping */}
//           <div className="prose prose-sm max-w-none text-gray-600 h-20">
//             <div
//               className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4"
//               dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
//             />
//           </div>
//         </div>

//         {/* Category Badge */}
//         <div>
//           <Badge
//             variant="outline"
//             className="rounded-full border-gray-300 text-black ml-2"
//           >
//             {project.category}
//           </Badge>
//         </div>

//         {/* Explore Button */}
//         <Button
//           variant="ghost"
//           className="mt-2 w-fit rounded-full text-gray-800 hover:bg-gray-100"
//         onClick={()=>{
//           router.push(`/${user?.username}/note/${project.note_id}`)
//         }}>
//           Explore More
//           <ChevronRight className="ml-2 h-4 w-4" />
//         </Button>
//       </div>
//     </Card>
//   );
// };


"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { get_user_by_id } from "@/services/actions/User";
import { User } from "@/db/schema";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";

interface NoteCardProps {
  project: {
    title: string;
    description: string;
    userId: number;
    category: string;
    note_id: number;
  };
}

export const NoteCard: React.FC<NoteCardProps> = ({ project }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await get_user_by_id(project.userId);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    getUser();
  }, [project.userId]);

  const sanitizedDescription = DOMPurify.sanitize(
    project.description || "No description available."
  );

  return (
    <Card className="w-full   transition-colors duration-200 cursor-pointer border-0 shadow-none round bg-tra"
          onClick={() => router.push(`/user/${user?.username}/note/${project.note_id}`)}>
      <CardContent className="p-6 w-full">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <div 
            className="text-sm text-gray-600 line-clamp-3 min-h-[4.5rem]"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />

          {/* Footer: User Info, Category, and Date */}
          <div className="text-blue-500 flex items-center">
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          <div className="flex items-center justify-start pt-4 text-xs text-gray-500">
            <div className="flex items-center space-x-2 justify-start">
              {user ? (
                <>
              <UserAvatar className="h-6 w-6"/>
                  <span>{user.username || "Loading..."}</span>
                </>
              ) : (
                <Avatar className={`h-10 w-10 `}>
                {/* Avatar Image */}
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/pixel-art/svg/${Math.random()}`} // Use the user's avatar URL or fallback to an empty string
                  alt={"User"} // Use the username as alt text or fallback to "User"
                />
          
                {/* Avatar Fallback */}
                <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                 user
                </AvatarFallback>
              </Avatar>
              )}
              <span className="text-gray-300">|</span>
              <span>{project.category}</span>
              <span className="text-gray-300">|</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            {/* Read More */}
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;