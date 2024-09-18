import {NextFunction} from "express";
import {IUser} from "../models/Users";


export default async function adminMiddleware(req:any, res:any, next:NextFunction) {
    const user:IUser = req.user;
    if (!user) {
        return res.status(401).send("Invalid token");
    }

    if (user.type !== "admin") {
        return res.status(403).send("Not authorized user");
    }


    next();
}