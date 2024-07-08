'use client'
import { useSession, signOut, signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import {User} from 'next-auth'
import { Button } from './ui/button'


const Navbar = () => {
    const { data: session, status } = useSession()
    
    const user: User = session?.user as User
  return (
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto'>
            <a href="#"> MSGapp</a>
            {
                session? (
                    <><span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                    <Button className='w-full md:w-auto' onClick ={()=>{signOut()}} >Logout</Button></>
                ) : (<Link href='/sign-in'>
                    <Button className='w-full md:w-auto' onClick={()=>{signIn()}}>Login</Button>
                </Link>)
            }
        </div>
    </nav>
  )
}

export default Navbar