import { Request, Response } from "express";
import { prismaClient } from "./database/prismaClient";
import argon2 from "argon2";
import { tokenverify } from "../tokenclass/token-verify";


export class ChangePasswordUserController{
    async handle(request: Request, response: Response){
      
      const { password } = request.body;
      const userID = tokenverify(request.headers.authorization)

      const changepassword = prismaClient.user.findUnique({
        where: {id: userID}
      })

      if(!changepassword){
          return response.status(400).json({ success: false, error: "User not found"});
        }

      const hash = await argon2.hash(password);

      await prismaClient.user.update({
        data: {
          hash: hash,
        },
        where: {
          id: userID
        },
      });
      
      return response.status(200).json({ success: true });
    }
}