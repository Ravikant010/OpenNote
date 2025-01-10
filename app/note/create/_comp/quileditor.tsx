"use client"
import React, { RefObject, useRef } from 'react'
import QuillEditor from '../_components/QuillEditor'
import Quill from 'quill';

type Props = {}

export default function Quileditor({}: Props) {
    const quillRef = useRef<RefObject<Quill> | null>(null);
  return (
    <div className='w-full  flex-1'>
<QuillEditor quillRef={quillRef} /></div>
  )
}