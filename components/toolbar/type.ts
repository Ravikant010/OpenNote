import Quill from "quill";
import { RefObject } from "react";

export interface ToolbarButtonProps {
    icon: React.ElementType;
    onClick: () => void;
    label: string;
    isActive?: boolean | unknown;
  }


  export interface ToolbarProps {
    quill: RefObject<Quill> | null;
    isSidebarCollapsed: boolean ;
    setSidebarCollapsed: (collapsed: boolean) => void;
  }
  