import {model, Schema} from "mongoose";

interface IMovie {
    title: string;
    director: string;
    producer: string;
    releaseYear: number;
    price: number;
}

const userSchema = new Schema<IMovie>({
    title: { type: String, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    price: { type: Number, required: true },
});

export const Movie = model("Movie", userSchema);