import { Request, Response } from 'express';
import { tokenverify } from '../tokenclass/token-verify';
import { prismaClient } from "./database/prismaClient";

export class HomeController{
  async handle(request: Request, response: Response){

    const {category , city} = request.body;

    const userID = tokenverify(request.headers.authorization)

    const eventtofind =await prismaClient.event.findMany({
      where:{
        category: category,
        city: city
      }
    })
    return response.status(200).json(eventtofind);
  }
}