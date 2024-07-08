'use client'
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const {toast} = useToast()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //creating onSubmit function
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      await axios.get(`/api/auth/[...nextauth]`)
    } catch (error) {
      
    }
  }

  return (
    <div>sign-in</div>
  )
}

export default SignIn