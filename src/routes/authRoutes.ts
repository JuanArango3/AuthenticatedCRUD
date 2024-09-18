import {doLogin} from "../service/authService";
import {Router} from "express";


export default Router().post("/login", async (req, res) => {

    try {
        const {username, password} = req.body;
        const token = await doLogin(username, password);

        res.status(200).json({
            token: token,
            expiresIn: process.env.JWT_DURATION
        });
    } catch (error) {
        res.status(401).send("Authentication failed");
    }
});