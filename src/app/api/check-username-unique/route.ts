import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
  /* if(req.method!=='GET'){
        return Response.json({
            success:false,
            message: 'Method not allowed'
        },{status:400})
    } */

  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid query Parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const exisitngVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (exisitngVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
