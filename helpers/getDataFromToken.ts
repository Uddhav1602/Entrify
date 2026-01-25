import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        // Verify token
        //we have written here 'decodedToken:any' to avoid typescript error "the datatype of decodedtoken is not known"
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}