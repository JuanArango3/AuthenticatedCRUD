import {User} from "../models/Users";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";


export async function doLogin(username: string, password: string):Promise<string> {
    const user = await User.findOne({username});

    if (!user || !await compare(password, user.password)) {
        throw new Error("Auth failed");
    }

    // @ts-ignore
    return sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURATION});
}

export async function verifyToken(authorization?: string): Promise<String|undefined> {
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return;
    }

    return authorization.substring(7);

}