import {model, Schema} from "mongoose";

export type role = "user"|"admin";
export interface IUser {
    username: string;
    password: string;
    type: role;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true }
});

export const User = model("User", userSchema);