import {IUser, User} from "../models/Users";
import {genSaltSync, hash} from "bcryptjs";

const salt = genSaltSync(10);

export async function createUser(user:IUser) {
    let newUser = new User(user);
    newUser.password = await hash(user.password, salt);

    await newUser.save();
}