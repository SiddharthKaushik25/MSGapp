import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(req: Request, {params}:{params:{messageid: string}}) {
  const messageId= params.messageid
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 400 }
    );
  
  }
  try {
    const result = await UserModel.updateOne(
      {_id: user._id,}, 
      {$pull: {messages: {messageid: messageId}}}
    )
    if(result.modifiedCount ==0){
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        success: false,
        message: "Something went Wrong",
      },
      { status: 500 }
    );
  }
}
