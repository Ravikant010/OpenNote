
import React from 'react'
import signInWithGoogle from './auth'
import Auth from './auth'
import SignupForm from '@/components/signup-form'
import { getSession } from '@/lib/session'

type Props = {}

export default async function Page({}: Props) {

  return (
  <SignupForm/>
  )
}

