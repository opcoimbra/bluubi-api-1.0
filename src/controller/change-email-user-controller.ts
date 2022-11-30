import { Request, Response } from "express";
import { tokenverify } from "../tokenclass/token-verify";
import { prismaClient } from "./database/prismaClient";


export class ChangeUserEmailController{
    async handle(request: Request, response: Response){
      
      const { email } = request.body;
      const userID = tokenverify(request.headers.authorization)

        await prismaClient.user.update({
          data: {
            email: email,
          },
          where: {
            id: userID
          },
        });
      
        return response.status(200).json({ success: true });
    }
}