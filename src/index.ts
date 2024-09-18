import {configDotenv} from "dotenv";
import mongoose from "mongoose";
import express from "express";
import {IUser, role, User} from "./models/Users";
import {createUser} from "./service/userService";
import authRoutes from "./routes/authRoutes";
import tokenMiddleware from "./middleware/tokenMiddleware";
import moviesRoutes from "./routes/moviesRoutes";

configDotenv();

export const app = express();

async function configureServer() {
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URI);

    await checkUsersRoles(["admin", "user"]);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(authRoutes);

    app.use("/movies", moviesRoutes)

    if (mongoose.connection.readyState) {
        app.listen(process.env.HTTP_PORT, () => {
            console.log("Server running on port: " + process.env.HTTP_PORT);
        }).on("error", (err) => {
            console.error(err);
        })
    }

    // @ts-ignore
    app.get("/", tokenMiddleware, (req, res) => {
        return res.status(200).send("Hello world");
    })
}

async function checkUsersRoles(roles: role[]) {
    for (let role of roles) {
        const query = await User.findOne({type: role});

        if (!query) {
            const user = new User<IUser>({
                username: role,
                password: "123",
                type: role,
            });
            await createUser(user);
        }
    }
}

configureServer();