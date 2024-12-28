interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <div className="relative z-20">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}>
        {title}
      </h1>
      <div className="w-48 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8 sm:mb-12 animate-pulse" />
    </div>
  );
}
