import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {z} from "zod" // TO BE DONE: Connect zod 

export async function POST(req:Request){
    await dbConnect()

    try{
        const {username, code} = await req.json()
        const decodedUsername = decodeURIComponent(username)
        const user= await UserModel.findOne({
            username: decodedUsername
        })
        if(!user){
            return Response.json({
                message:"User not found",
                success: false,
            },{status: 500})
        }

        const isCodeValid = user.verifyCode=== code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message:"Account verified successfully"
                }
            )
        }else{
            return Response.json({
                success: false,
                message: "Either your code is incorrect or Verification code has expired"
            },{status:400})
        }

    }catch(error){
    console.error("Error verifying User", error);
    return Response.json(
      {
        success: false,
        message: "Error varifying user",
      },
      { status: 500 })
    }
}