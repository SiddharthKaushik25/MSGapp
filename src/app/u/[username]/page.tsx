"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { apiResponse } from "@/types/apiResponse";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { Label } from "@/components/ui/label";

const Page = () => {
  const params = useParams();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const fetchAIMessages= async() =>{
    try {
      const response = await axios.get<apiResponse>(`/api/suggest-messages`);
      
    } catch (error) {
      
    }
  }

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post<apiResponse>("api/send-message", {
        ...data,
        username,
      });
      toast({
        title: "Message Sent",
        description: response.data.message,
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      console.log("Message not sent", error);
      const AxiosError = error as AxiosError<apiResponse>;
      let errorMsg = AxiosError.response?.data.message;
      toast({
        title: "Try sometime later",
        description: errorMsg ?? "Something went wrong",
        variant: "destructive",
      });
    }
  };



  return (
    <div>
      <div className="shadow-md p-3">
        <div className="flex w-full justify-between items-center px-8 font-bold text-xl my-5 tracking-wide">
          <div>MSGapp</div>
          <div>Public Profile Link</div>
          <Link href="/sign-in">
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Register Now!!
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="message">
                        Send anonymous message to {username}
                      </Label>
                      <Textarea
                        placeholder="Type your message here."
                        id="message"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send</Button>
          </form>
        </Form>
        <Separator className="my-4"/>

          <div >
            
          </div>

      </div>
      
    </div>
  );
};

export default Page;
