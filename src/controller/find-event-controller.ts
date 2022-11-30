import { Request, Response } from 'express';
import { tokenverify } from '../tokenclass/token-verify';
import { prismaClient } from "./database/prismaClient";

export class HomeController{
  async handle(request: Request, response: Response){

    const userID = tokenverify(request.headers.authorization)

    const eventtofind =await prismaClient.event.findMany()
    return response.status(200).json(eventtofind);
  }
}