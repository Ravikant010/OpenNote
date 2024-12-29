"use client"
import React from 'react'
import { GridBackground } from '../ui/GridBG'
import { useRouter } from 'next/navigation'

type Props = {}

export default function Header({}: Props) {
  const router = useRouter()
  return (
    <section className="relative w-full overflow-hidden ">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] md:w-[1500px] lg:w-[2000px] h-[400px] rounded-[100%] bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent blur-[100px] z-30 pointer-events-none" />
 
    <GridBackground>
      <div className="w-full px-4 py-16 sm:py-24 lg:py-32">
        <h1 className="text-[2rem] sm:text-[2.4rem] text-center flex flex-col items-center justify-center font-bold capitalize font-sans bg-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent max-w-4xl mx-auto leading-relaxed relative z-20">
          Open Note <br/>
          <span className="text-xl sm:text-2xl mt-4">
            Share Your Ideas with the World 
            Create, Edit, and Publish Notes Seamlessly
          </span>
        </h1>
        
        <div className="flex justify-center mt-12 sm:mt-20 relative " >
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 tracking-wider" >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl" onClick={()=>{
             console.log("FDdf") 
              router.push("/note/create")}
              
              }>
              Create Note
            </span>
          </button>
        </div>
      </div>
    </GridBackground>
  </section>

  )
}