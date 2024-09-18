import {NextFunction} from "express";
import {verifyToken} from "../service/authService";
import {verify} from "jsonwebtoken";
import {IUser, User} from "../models/Users";


export default async function tokenMiddleware(req:any, res:any, next:NextFunction) {
    const handleUnauthorized = () => res.status(401).send("Invalid token");

    const token = await verifyToken(req.header("Authorization"));
    if (!token) {
        return handleUnauthorized();
    }

    try {
        // @ts-ignore
        const decoded = verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({_id: decoded.userId});

        req.user = user;

        if (!user) {
            return handleUnauthorized();
        }
    } catch (error) {
        return handleUnauthorized();
    }

    next();
}