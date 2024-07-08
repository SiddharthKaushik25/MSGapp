'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import {User} from 'next-auth'


const Navbar = () => {
    const { data: session, status } = useSession()
    
  return (

    <div>navbar</div>
  )
}

export default Navbar