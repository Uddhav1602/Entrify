import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10); //bcrypt.hash() is a function that combines (mixes) your password with a generated salt and then applies multiple hashing rounds to produce a secure, irreversible hash.
        const hashedPassword = await bcrypt.hash(password, salt);


        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser =await newUser.save();
        console.log(savedUser);

        //send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }    
}