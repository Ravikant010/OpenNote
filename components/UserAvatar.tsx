"use client"; // Mark this as a client component
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { get_user } from "@/services/actions/User";
import { useEffect, useState } from "react";

type UserAvatarProps = {
  className?: string; // Optional className for custom styling
};

export default function UserAvatar({ className }: UserAvatarProps) {
  const [user, setUser] = useState<{ avatar?: string; username?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await get_user();
      if(userData)
      setUser({avatar: userData.avatar!!, username: userData.username});
    };

    fetchUser();
  }, []);

  // Handle the case where user is not available
  if (!user) {
    return (
      <Avatar className={`h-10 w-10 ${className}`}>
        <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
          U
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className={`h-10 w-10 ${className}`}>
      {/* Avatar Image */}
      <AvatarImage
        src={user?.avatar || ""} // Use the user's avatar URL or fallback to an empty string
        alt={user?.username || "User"} // Use the username as alt text or fallback to "User"
      />

      {/* Avatar Fallback */}
      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
        {user?.username?.charAt(0).toUpperCase() || "U"} {/* Display the first letter of the username or "U" */}
      </AvatarFallback>
    </Avatar>
  );
}