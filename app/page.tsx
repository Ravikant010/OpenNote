import Header  from "@/components/layout/header";
import { FloatingNav } from "@/components/ui/floating_navbar";
import { LayoutDashboard, PlusCircle, UserCircle } from "lucide-react";
import { HeroSection } from "@/components/home/hero-section";
import Body from "@/components/layout/body";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { getSession } from "@/lib/session";
// import { fetchAllNotes } from "@/services/apis/api";
import { NavMenu } from "@/components/nav-menu"; 
import { getAllNotes } from "@/services/actions/notes";
export default async function Page() {
  const session = await  getSession()
  const {data:notes}  = await getAllNotes()
  console.log(notes)
  if(!session.userId)
  return (
    <main className="min-h-screen w-full">
      <div className="fixed top-4 right-4 z-50">
        {/* <ModeToggle /> */}
      </div>
      <FloatingNav navItems={[
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
          name: "Create Note",
          link: "/note/create",
          icon: <PlusCircle className="w-5 h-5" />
        },
        {
          name: "Profile",
          link: "/profile",
          icon: <UserCircle className="w-5 h-5" />
        }
      ]}/>
    <Header />
  <HeroSection />
  <Body/>
<Footer/>
    </main>
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4 flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Community Notes
            </h1>
            <div className="h-1 flex-grow rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20" />
          </div>
          <div className="flex items-center gap-4">
            <NavMenu isLoggedIn={!!session?.userId} />
            {/* {session?.userId && (
              <Link 
                href="/note/create"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
              >
                <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Create Note
              </Link>
            )} */}
          </div>
        </div>
        <p className="text-gray-400 text-lg">Discover and explore notes from our community</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note) => (
          <Link 
            href={`/${note.userId}/note/${note.id}`} 
            key={note.id}
            className="block group hover:no-underline"
          >
            <div className="group bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/10 hover:border-blue-500/30 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300 h-60">
              <div className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-fit" />
                <h2 
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: note.title }}
                />
                <div 
                  className="text-gray-200/80 mb-4 line-clamp-3 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
                <div className="border-t border-purple-500/10 pt-4 mt-4">
                  <div className="flex flex-col space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Created: {new Date(note.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Updated: {new Date(note.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
