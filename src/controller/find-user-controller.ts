import { Request, Response } from 'express';
import { tokenverify } from '../tokenclass/token-verify';
import { prismaClient } from "./database/prismaClient";

export class FindUserController{
  async handle(request: Request, response: Response){

    const userID = tokenverify(request.headers.authorization)

    const usertofind = await prismaClient.user.findUnique({
      where: {
        id: userID
      }
    })
    return response.status(200).json(usertofind);
  }
}