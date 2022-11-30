import { Request, Response } from "express";
import { prismaClient } from "./database/prismaClient";
import argon2 from "argon2";
const jwt = require("jsonwebtoken");

export class SignInController{
    async handle(request: Request, response: Response){
    
    const { username, password } = request.body;

    if (!(username && password)) {
        response.status(400).send("All input is required");
    }

    const signin = await prismaClient.user.findUnique({
        where: {
            username,
        },
    });

    try {
        if(signin)
        {
            if (await argon2.verify(signin.hash, password)) {
                const token = jwt.sign(
                    { user_id: signin.id , username: signin.username, email: signin.email }, 
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    subject: String(signin.id)
                    }
                );

                signin.token = token;

                return response.status(200).json({token});
            } else
                return response.status(400).json({ success: false, error: "Invalid Password" });
        }
        else
            return response.status(400).json({ success: false, error: "User not found" });
    }
    catch (err) {
            return response.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
}

