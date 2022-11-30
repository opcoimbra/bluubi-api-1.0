import { Request, Response } from "express";
import { prismaClient } from "./database/prismaClient";
import argon2 from "argon2";
const jwt = require("jsonwebtoken");


export class SignUpController{
   async handle(request: Request, response: Response){
        const {name, username, password, email} = request.body
        try{
            if(!(name && username && password && email))
            {
                response.status(400).send("All input is required");
            }

            const result = await prismaClient.user.findUnique({
                where: {
                    username
                }
            });

            if(result) return response.status(400).json({success:false, error:"User already exists"});
            
            const hash = await argon2.hash(password);

            const user = await prismaClient.user.create({
                data: {
                    email,
                    username,
                    hash,
                    name
                }
            })

            const token = jwt.sign(
                { user_id: user.id, username: user.username, email: user.email },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                subject: String(user.id)
                }
            );

            user.token = token;

            return response.status(200).json(token);
        }
        catch(err)
        {
            console.log(err)
        }
   }
}