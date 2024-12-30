import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};




import React from "react";

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-screen-xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
        alt="Innovation"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconClipboardCopy className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1518770660439-4636190af475"
        alt="Digital Revolution"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconFileBroken className="h-6 w-6 text-green-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2"
        alt="Design"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconSignature className="h-6 w-6 text-purple-500" />,
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3"
        alt="Communication"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconTableColumn className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
        alt="Knowledge"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconArrowWaveRightUp className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Creation"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconBoxAlignTopLeft className="h-6 w-6 text-pink-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: (
      <Image
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
        alt="Adventure"
        width={500}
        height={200}
        className="w-full h-32 object-cover"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-6 w-6 text-red-500" />,
  },
];

export default items;