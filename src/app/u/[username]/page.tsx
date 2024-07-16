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

  const onSubmit= async (data: z.infer<typeof messageSchema>) =>{
    try {
      const response = await axios.post<apiResponse>("api/send-message",{
        ...data,
        username
      })
      toast({
        title: "Message Sent", 
        description: response.data.message,
      });
      form.reset({...form.getValues(),content: ''})
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
  }

  return (
    <div>
      <h1 className="flex w-full justify-center">Public Profile Link</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
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
          <Button type="submit" >
            Send
          </Button>
        </form>
      </Form>

      
    </div>
  );
};

export default Page;
