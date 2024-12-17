import { X } from 'lucide-react'
import React from 'react'

type Props = {
    _function : ()=>void
}

export default function close_menu({_function}: Props) {
  return (
    <X width={26} height={26}  className="rounded-full text-white dark:text-white bg-[#232426]" onClick={_function}/>
  )
}