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
  if (!session || session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 400 }
    );
  }
}
