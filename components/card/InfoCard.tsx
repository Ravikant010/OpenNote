
// import React from 'react';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronRight } from 'lucide-react';
// import { CardData } from './type';
// import { useInView } from "react-intersection-observer";
// import AnimateOnScroll from '../animation';
// const LineGraph = () => (
//   <svg
//     viewBox="0 0 100 30"
//     className="w-24 h-8 text-gray-400"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M0 20 Q25 5, 50 25 T100 10" />
//   </svg>
// );

// const FeatureCard: React.FC<{ feature: { title: string; description: string; icon: JSX.Element } }> = ({ feature }) => {
//   return (
//     <Card className="flex-1 p-4 bg-white rounded-2xl shadow-md h-fit w-full min-h-fit transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-[#D4E1FF] hover:to-[#A0B4E8] hover:scale-105 hover:shadow-lg hover:border hover:border-[#A0B4E8]">
//       {/* Top bar with Close, Minimize, Maximize buttons */}
     
//       {/* Card Content */}
//       <div className="space-y-3">
//         {/* Icon */}
//         <div className="text-blue-500">{feature.icon}</div>

//         {/* Title */}
//         <h3 className="text-base font-semibold text-gray-800">{feature.title}</h3>

//         {/* Description */}
//         <p className="text-sm text-gray-600 line-clamp-3">{feature.description}</p>

//         {/* Learn More Button */}
//         <Button
//           variant="ghost"
//           className="w-fit flex items-center gap-2 text-left font-normal rounded-full hover:bg-[#E6EEFF] hover:text-blue-700"
//         >
//           Learn more
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </Card>
//   );
// };


// const features = [
//   {
//     title: "Customizable Writing Experience",
//     description: "Enjoy a distraction-free, fully customizable editor. Format your text, add media, and organize content to create notes, articles, and blogs that reflect your unique style.",
//   },
//   {
//     title: "Advanced Search & Discovery",
//     description: "Find what you need instantly with powerful search capabilities. Filter by tags, keywords, or authors to access your notes, articles, and other content in seconds.",
//   },
//   {
//     title: "Content Engagement & Analytics",
//     description: "Track how your content performs. Get detailed analytics on views, likes, comments, and shares, helping you understand your audience and improve your content strategy.",
//   },
//   {
//     title: "Multiple User Roles & Permissions",
//     description: "Control access with role-based permissions. Assign different roles to users (Admin, Editor, Viewer) to ensure everyone has the appropriate level of access to your content.",
//   },
//   {
//     title: "Seamless Sharing Options",
//     description: "Share your notes or articles privately with specific people or publicly with the world. Our flexible sharing options give you control over who sees your content and when.",
//   },
//   {
//     title: "Enterprise-Grade Security",
//     description: "Your content is protected with state-of-the-art security measures. We use encryption and role-based access control to keep your data safe, no matter how large your team or content library grows.",
//   },
//   {
//     title: "Integration with Your Workflow",
//     description: "Open-Note integrates with popular tools like Google Drive, Slack, and Trello, making it easier to manage your content alongside the rest of your team's workflow.",
//   },
//   {
//     title: "Version History & Tracking",
//     description: "Never lose your work again. Open-Note tracks every change made to your notes, allowing you to easily revert to previous versions and keep an organized history of your content.",
//   },
//   {
//     title: "Cross-Platform Accessibility",
//     description: "Access your content anywhere, anytime. Open-Note works across all devices, ensuring you can write, edit, and share your notes whether you’re on desktop, tablet, or mobile.",
//   }
// ];

// export default function Features() {
//   return (
//     <>
//       {features.map((feature, index) => (
//         <AnimateOnScroll
//           key={index}
//           animationClass="opacity-100 translate-y-0"
//         >
//           <div className="flex-1 p-6 bg-white rounded-3xl shadow-lg h-fit w-full min-h-fit transition-all duration-300 ease-in-out hover:bg-[#D4E1FF] hover:scale-105 hover:shadow-xl hover:border hover:border-[#A0B4E8]">
//             <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
//             <p className="text-gray-600">{feature.description}</p>
//           </div>
//         </AnimateOnScroll>
//       )
//     )
//   }
//     </>
//   )
// }


import React from "react";
import { ChevronRight } from "lucide-react";
import AnimateOnScroll from "../animation";

// Icons for features (you can replace these with your own icons)
import {
  PenSquare,
  Search,
  BarChart,
  Users,
  Share2,
  Lock,
  Settings,
  Clock,
  Smartphone,
} from "lucide-react";

const FeatureIcons = [
  <PenSquare key="pen" className="w-8 h-8 text-blue-500" />, // Customizable Writing Experience
  <Search key="search" className="w-8 h-8 text-blue-500" />, // Advanced Search & Discovery
  <BarChart key="chart" className="w-8 h-8 text-blue-500" />, // Content Engagement & Analytics
  <Users key="users" className="w-8 h-8 text-blue-500" />, // Multiple User Roles & Permissions
  <Share2 key="share" className="w-8 h-8 text-blue-500" />, // Seamless Sharing Options
  <Lock key="lock" className="w-8 h-8 text-blue-500" />, // Enterprise-Grade Security
  <Settings key="settings" className="w-8 h-8 text-blue-500" />, // Integration with Your Workflow
  <Clock key="clock" className="w-8 h-8 text-blue-500" />, // Version History & Tracking
  <Smartphone key="smartphone" className="w-8 h-8 text-blue-500" />, // Cross-Platform Accessibility
];

const features = [
  {
    title: "Customizable Writing Experience",
    description:
      "Enjoy a distraction-free, fully customizable editor. Format your text, add media, and organize content to create notes, articles, and blogs that reflect your unique style.",
  },
  {
    title: "Advanced Search & Discovery",
    description:
      "Find what you need instantly with powerful search capabilities. Filter by tags, keywords, or authors to access your notes, articles, and other content in seconds.",
  },
  {
    title: "Content Engagement & Analytics",
    description:
      "Track how your content performs. Get detailed analytics on views, likes, comments, and shares, helping you understand your audience and improve your content strategy.",
  },
  {
    title: "Multiple User Roles & Permissions",
    description:
      "Control access with role-based permissions. Assign different roles to users (Admin, Editor, Viewer) to ensure everyone has the appropriate level of access to your content.",
  },
  {
    title: "Seamless Sharing Options",
    description:
      "Share your notes or articles privately with specific people or publicly with the world. Our flexible sharing options give you control over who sees your content and when.",
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Your content is protected with state-of-the-art security measures. We use encryption and role-based access control to keep your data safe, no matter how large your team or content library grows.",
  },
  {
    title: "Integration with Your Workflow",
    description:
      "Open-Note integrates with popular tools like Google Drive, Slack, and Trello, making it easier to manage your content alongside the rest of your team's workflow.",
  },
  {
    title: "Version History & Tracking",
    description:
      "Never lose your work again. Open-Note tracks every change made to your notes, allowing you to easily revert to previous versions and keep an organized history of your content.",
  },
  {
    title: "Cross-Platform Accessibility",
    description:
      "Access your content anywhere, anytime. Open-Note works across all devices, ensuring you can write, edit, and share your notes whether you’re on desktop, tablet, or mobile.",
  },
];

export default function Features() {
  return (
   <>
        {features.map((feature, index) => (
          <AnimateOnScroll
            key={index}
            animationClass="opacity-100 translate-y-0"
          >
            <div className="group p-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-50 hover:scale-105">
              {/* Icon */}
              <div className="text-4xl mb-4 text-blue-500">
                {FeatureIcons[index]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4">{feature.description}</p>

              {/* Learn More Button */}
              <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300">
                Learn more <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </AnimateOnScroll>
        ))}
</>

  );
}