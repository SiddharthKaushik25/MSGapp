import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
    _id: string | number | any;
}

const MessageSchema: Schema<Message> =new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAccceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is mandatory"],
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: [true,"Email is mandatory"],
        unique:true,
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"Please use a valid email address"]
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    verifyCode:{
        type: String,
        required: [true,"Verify Code is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true,"Verify Code Expiry is required"]
    },
    isVerified:{
        type: Boolean,
        default: false,

    },
    isAccceptingMessage:{
        type:Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User> ) || mongoose.model<User>("User",UserSchema)

export default UserModel