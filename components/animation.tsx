"use client"
import { useInView } from "react-intersection-observer";
const AnimateOnScroll = ({
    children,
    animationClass,
    threshold = 0.2,
  }: {
    children: React.ReactNode;
    animationClass: string;
    threshold?: number;
  }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold,
    });
    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-out ${inView ? animationClass : "opacity-0 translate-y-10"}`}
      >
        {children}
      </div>
    );
  };

  export default AnimateOnScroll;