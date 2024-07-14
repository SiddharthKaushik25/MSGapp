"use client";

import MsgCard from "@/components/MsgCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message, User } from "@/models/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { apiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isswitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMEssage = (messageId: string) => {
    setMessages(messages.filter((messages) => messages._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<apiResponse>(`/api/accept-messages`);
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch Message Acceptance Status",
        variant: "destructive",
      });
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<apiResponse>(`/api/get-messages`);
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Error",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<apiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch Message Acceptance Status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setIsSwitchLoading, toast]
  );

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    fetchAcceptMessage();
    fetchMessages();
  }, [fetchAcceptMessage, session, setValue, fetchMessages]);

  //switch change
  const handleChange = async () => {
    try {
      const response = await axios.post<apiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages, //try isAcceptingMessages if this fails
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch Message Acceptance Status",
        variant: "destructive",
      });
    }
  };

  const {username} = session?.user as User
  //read about extracting baseurl
  const baseUrl = '${window.location.protocol}//${window.location.host}'
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "Copied to Clipboard",
      variant: "default",
    })
  }

  if (!session || !session.user) {
    return <div>Please Login</div>;
  }

  return <div><div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
  <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

  <div className="mb-4">
    <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
    <div className="flex items-center">
      <input
        type="text"
        value={profileUrl}
        disabled
        className="input input-bordered w-full p-2 mr-2"
      />
      <Button onClick={copyToClipboard}>Copy</Button>
    </div>
  </div>

  <div className="mb-4">
    <Switch
      {...register('acceptMessages')}
      checked={acceptMessages}
      onCheckedChange={handleChange}
      disabled={isswitchLoading}
    />
    <span className="ml-2">
      Accept Messages: {acceptMessages ? 'On' : 'Off'}
    </span>
  </div>
  <Separator />

  <Button
    className="mt-4"
    variant="outline"
    onClick={(e) => {
      e.preventDefault();
      fetchMessages(true);
    }}
  >
    {isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      <RefreshCcw className="h-4 w-4" />
    )}
  </Button>
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {messages.length > 0 ? (
      messages.map((message) => (
        <MsgCard
          key={message._id}
          message={message}
          onMessageDelete={handleDeleteMEssage}
        />
      ))
    ) : (
      <p>No messages to display.</p>
    )}
  </div>
</div></div>;
};

export default Page;
