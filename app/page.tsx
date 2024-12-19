"use client";
import Counter from "@/components/counter";
import { Header } from "@/components/header";
import Menu from "@/components/menu";
import NoteCard from "@/components/note-card";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isShowMenu, setShowMenu] = useState(false);
  function toggleMenu() {
    setShowMenu(!isShowMenu);
  }
  return (
    <div className=" ">
      <Menu isShowMenu={isShowMenu} toggleMenu={toggleMenu} />

      <Header toggleMenu={toggleMenu} isShowMenu={isShowMenu} />

      <NoteCard />
    </div>
  );
}
