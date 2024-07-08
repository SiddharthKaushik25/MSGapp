"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/models/User";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { apiResponse } from "@/types/apiResponse";

type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId:string) =>void
}

const MsgCard = ({message, onMessageDelete}:MessageCardProps) => {
    const {toast} = useToast()
    const handleDeleteConfirm = async() =>{
        const response = await axios.delete<apiResponse>(`/api/delete-message/${message._id}`,)
        toast({
            title: response.data.message
        })
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X className="w-5 h-5"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(handleDeleteConfirm)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default MsgCard;
