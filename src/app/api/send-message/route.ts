import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();

  const { username, content } = await req.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    if (!user.isAccceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message)
    await user.save()
    return Response.json(
        {
          success: true,
          message: "Message sent",
        },
        { status: 200 }
      );
  } catch (error) {
    console.log("Error adding Message",error)
    return Response.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
  }
}
