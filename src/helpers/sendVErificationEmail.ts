import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { apiResponse } from "@/types/apiResponse";
import { verify } from "crypto";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<apiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@msgapp.vercel',
            to: email,
            subject: 'MSGAPP Verification Mail',
            react: VerificationEmail({username , otp: verifyCode}),
          });
        return{
            success: true, message: "Email sent successfully"
        }
    }catch(emailerror){
        console.error("Error sending Verification Email", emailerror)
        return{success: false, message: "Failed to send verification Email "}
    }
}