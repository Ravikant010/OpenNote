
import AnimateOnScroll from "@/components/animation";
import CommunitySection from "@/components/card/Community";
import Features from "@/components/card/InfoCard";
import { TypewriterEffectSmoothDemo } from "@/components/typewriter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, LogIn } from "lucide-react";
import React from "react";


const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 flex flex-col">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(123,97,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(255,117,203,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_100%,rgba(99,179,237,0.1),transparent)]" />
      </div>
      {/* Content */}
      <div className="relative px-4 py-32 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-wider text-gray-900">
            {/* OPEN<span className="text-blue-600">NOTE</span> */}
            <TypewriterEffectSmoothDemo />
            {/* <span className="inline-block w-2 h-8 ml-1 bg-blue-600 animate-pulse"/> */}
          </h1>
        </div>
        {/* Main heading */}
        <h2 className="max-w-4xl mb-8 text-3xl font-medium text-gray-800 sm:text-4xl md:text-5xl">
          Open Note is the ultimate note-taking app that helps you stay
          <span className="relative inline-block px-2 mx-1">
            <span className="relative z-10">organized</span>
            <div className="absolute inset-0 transform -rotate-2">
              <div className="absolute inset-0 bg-blue-100 rounded-lg" />
            </div>
          </span>
          and
          <span className="relative inline-block px-2 mx-1">
            <span className="relative z-10">productive</span>
            <div className="absolute inset-0 transform rotate-1">
              <div className="absolute inset-0 bg-pink-100 rounded-lg" />
            </div>
          </span>
        </h2>
        {/* Subheading */}
        <p className="max-w-2xl mb-12 text-lg text-gray-600 sm:text-xl">
          Capture your thoughts, ideas, and tasks with ease, and access them
          across all your devices. With its clean interface and smart features,
          Open Note simplifies your workflow and keeps you on top of your game.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Get Started Button */}
          <Link href = {"/"}className="flex items-center justify-center gap-2 px-8 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          {/* Login Button */}
          <Link 
    href="/login" 
    className="flex items-center justify-center gap-2 px-8 py-3 text-blue-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
  >
    <span>Login</span>
    <LogIn className="w-5 h-5" />
  </Link>
        </div>
        {/* Scroll indicator */}
        <div className=" flex-col items-center animate-bounce justify-center mt-44">
          <span className="text-sm text-gray-500 mb-2">
            Features That Simplify Your Life
          </span>
          <svg
            className="w-6 h-6 text-gray-400 self-center mx-auto "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
const SvgComponent = () => (
  <div className="relative w-full h-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 700 700"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      opacity="0.41"
    >
      <defs>
        <linearGradient
          gradientTransform="rotate(115, 0.5, 0.5)"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="ffflux-gradient"
        >
          <stop stopColor="hsl(315, 100%, 72%)" stopOpacity="1" offset="0%" />
          <stop stopColor="hsl(227, 100%, 50%)" stopOpacity="1" offset="100%" />
        </linearGradient>
        <filter
          id="ffflux-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005 0.003"
            numOctaves="1"
            seed="165"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          />
          <feGaussianBlur
            stdDeviation="20 0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            edgeMode="duplicate"
            result="blur"
          />
          <feBlend
            mode="color-dodge"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            in2="blur"
            result="blend"
          />
        </filter>
      </defs>
      <rect
        width="700"
        height="700"
        fill="url(#ffflux-gradient)"
        filter="url(#ffflux-filter)"
      />
    </svg>
  </div>
);
import {
  Feather,
  Share2,
  Users,
  Layout,
  Layers,
  Grid,
  PenTool,
  MessageCircle,
  Zap,
  Tags,
  Code,
  Heart,
  Book,
  Plane,
  Briefcase,
  Palette,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { get_user_id } from "@/services/actions/User";
import { get_notes } from "@/services/actions/Note";
import { NoteCard } from "@/components/NoteCard";
import { CommunityNotes } from "@/components/Cummnity";
interface SectionTitleProps {
  icon: React.ElementType; // Expect a component type
  title: string;
  subtitle: string;
}





const SectionTitle: React.FC<SectionTitleProps> = ({
  icon: Icon,
  title,
  subtitle,
}) => (
  <div className="text-center mb-20">
    <div className="inline-flex items-center justify-center p-3 mb-4 bg-blue-50 rounded-xl animate-bounce">
      <Icon className="w-6 h-6 text-blue-600" /> {/* Use Icon as a component */}
    </div>
    <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
      {title}
    </h2>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-8"></div>
  </div>
);
// ProcessCard Props and Component
interface ProcessCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType; // Expect a component type
}
const ProcessCard: React.FC<ProcessCardProps> = ({
  number,
  title,
  description,
  icon: Icon,
}) => (
  <div className="group p-8 rounded-2xl bg-white hover:bg-blue-50 transition-all duration-300">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-20"></div>
        <div className="relative flex items-center justify-center w-full h-full bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
          <Icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
// CategoryBadge Props and Component
interface CategoryBadgeProps {
  Icon: React.ElementType; // Expect a component type
  text: string;
}
const CategoryBadge: React.FC<CategoryBadgeProps> = ({ Icon, text }) => (
  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-lg transition-all duration-300 mx-4">
    <Icon className="w-5 h-5 text-blue-600" />
    <span className="text-lg font-semibold text-gray-700">{text}</span>
  </div>
);
// Export components


const LandingPage = async() => {
  const categories = [
    { icon: Code, text: "Tech" },
    { icon: Heart, text: "Health" },
    { icon: Book, text: "Life" },
    { icon: Plane, text: "Travel" },
    { icon: Briefcase, text: "Business" },
    { icon: Palette, text: "Art" },
    { icon: GraduationCap, text: "Education" },
  ];
  //@ts-ignore
  const userId = await get_user_id()

  if(!userId)
  return (
    <div className="relative w-full font-sans">
      <Hero />
      {/* Features Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-full py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              icon={Layout}
              title="Features That Simplify Your Life"
              subtitle="Explore the powerful tools that make our platform the ultimate solution for organizing and sharing your content."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Features />
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            icon={Layers}
            title="How Open-Note Works"
            subtitle="Discover how Open-Note makes writing, publishing, and engaging easier than ever."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ProcessCard
              number={1}
              icon={PenTool}
              title="Create and Style"
              description="Write and format your content using our powerful yet simple editor."
            />
            <ProcessCard
              number={2}
              icon={Share2}
              title="Publish and Share"
              description="Share your notes instantly with anyone or post them publicly."
            />
            <ProcessCard
              number={3}
              icon={MessageCircle}
              title="Engage with Community"
              description="Connect with others through comments and real-time discussions."
            />
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="bg-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            icon={Tags}
            title="Our Wide Range of Categories"
            subtitle="Find the perfect space for your content across our diverse category options."
          />
          <div className="relative">
            <div className="flex animate-scroll space-x-4 py-4">
              {categories.map((category, index) => (
                <CategoryBadge
                  key={index}
                  Icon={category.icon}
                  text={category.text}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold text-lg mb-4 block">
              Community
            </span>
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              See What Our Community is Creating
            </h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-8"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CommunitySection />
          </div>
        </div>
      </section>
      {/* Collaboration Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            icon={Users}
            title="Collaborate and Share Your Ideas"
            subtitle="Join a vibrant community of writers, thinkers, and creators. Share ideas and grow together."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <PenTool className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Write and Style
                </h3>
                <p className="text-gray-600">
                  Create beautiful content with our intuitive editor.
                </p>
              </div>
            </div>
            <div className="group p-8 rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Share and Collaborate
                </h3>
                <p className="text-gray-600">
                  Work together in real-time with powerful collaboration tools.
                </p>
              </div>
            </div>
            <div className="group p-8 rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Engage and Grow
                </h3>
                <p className="text-gray-600">
                  Build connections and get valuable feedback from the
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );

  const notes = await get_notes()
  return (
    <div className="container mx-auto px-4 py-8">
    {/* Header Section */}
    <div className="mb-8">
      <div className="flex justify-between items-center flex-row-reverse">
        {userId && <PopMenu userId={Number(userId)} />}
        <h1 className="text-3xl font-bold">Open Note</h1>
      </div>
      <div className="flex gap-4 mb-6">
        <button className="text-sm font-medium hover:text-blue-500">Latest</button>
        <button className="text-sm font-medium hover:text-blue-500">Popular</button>
        <button className="text-sm font-medium hover:text-blue-500">Research & Publications</button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input className="pl-10 w-full max-w-xl" placeholder="Enter your search terms..." />
      </div>
    </div>
    <CategoryBadges />

    <CommunityNotes notes={notes} />
  
    {!notes.length && <p className="text-center mt-4">No notes yet</p>}
  </div>
  
  );
};

export default LandingPage;

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryBadges from "@/components/category";
import PopMenu from "@/components/PopMenu";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

// Extended sample data
const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Legal Updates and Changes for 2023-2024",
    description: "Key regulatory changes and legal developments that will impact businesses in the coming year.",
    category: "Newsletter",
    date: "2023.12.05"
  },
  {
    id: "2",
    title: "Understanding Recent Supreme Court Decisions",
    description: "Analysis of recent landmark cases and their implications for corporate law.",
    category: "Press Release",
    date: "2023.11.30"
  },
  {
    id: "3",
    title: "Corporate Compliance Guidelines 2024",
    description: "Essential updates to corporate compliance requirements and best practices.",
    category: "Research",
    date: "2023.11.28"
  }
];


const Footer = () => {
  return (
    <footer className=" text-black py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Open Note</h3>
            <p className="text-gray-400">
              Open Note is your ultimate note-taking app. Stay organized, share
              ideas, and collaborate with others effortlessly.
            </p>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400">
              Get the latest updates, news, and tips straight to your inbox.
            </p>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Open Note. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
