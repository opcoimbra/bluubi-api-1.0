import { Request, Response } from "express";
import { tokenverify } from "../tokenclass/token-verify";
import { prismaClient } from "./database/prismaClient";


export class DeleteAccountController{
    async handle(request: Request, response: Response){

      const userID = tokenverify(request.headers.authorization)

      const deleteaccount = await prismaClient.user.findUnique({
        where: {
          id: userID,
        }
      })

      if(!deleteaccount){
          return response.status(400).json({ success: false, error: "User not found"});
        }
        
      await prismaClient.user.delete({
            where: {
              id: deleteaccount.id
            },
          });
      return response.status(200).json({success: true, error: "User deleted"});
  }   
}