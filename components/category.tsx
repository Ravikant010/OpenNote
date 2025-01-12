"use client"; // Add this if you're using client-side interactivity
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge"; // Import shadcn/ui Badge
import { categories } from "@/lib/raw";
import { Button } from "./ui/button";

const CategoryBadges = () => {
  const [showMore, setShowMore] = useState(false); // State to toggle between showing all or limited categories
  const categoriesToShow = showMore ? categories : categories.slice(0, 10); // Show first 5 categories or all based on state

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center justify-start">
        {categoriesToShow.map((category, index) => {
          const Icon = category.icon; // Dynamically assign the icon component
          return (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center gap-2 px-3 py-1 text-sm rounded-full cursor-pointer"
            >
              <Icon className="h-4 w-4" /> {/* Render the Lucide icon */}
              <span>{category.text}</span> {/* Render the category text */}
            </Badge>
          );
        })}

{categories.length > 5 && (
        <Button
    
        variant="link"
        className="flex items-center gap-2 px-3 py-1 text-sm rounded-full text-blue-500"
        onClick={()=>setShowMore(!showMore)}
      >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      )}
      </div>
      
      {/* Show "More" button if there are more categories to show */}
      
    </div>
  );
};

export default CategoryBadges;
