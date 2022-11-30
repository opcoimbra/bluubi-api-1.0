import { Request, Response } from "express";
import { tokenverify } from "../tokenclass/token-verify";
import { prismaClient } from "./database/prismaClient";

export class EventController {
  // /create-event
  async handle(request: Request, response: Response) {
    const { name,city,description,local } = request.body;
    
    const userID = tokenverify(request.headers.authorization)

    const eventorganizer = await prismaClient.user.findUnique({
        where: {
          id: userID,
        }
      })

    const eventvalidation = await prismaClient.event.findUnique({
      where: {
        name
      }
    })

    if(eventvalidation){
      return response.status(400).json({ success: false, error: "Event aleready exist." })
    }

    if(!eventorganizer) {
      return response.status(400).json({ success: false, error: "Organizer not found." })
    }

    const event = await prismaClient.event.create({
      data: {
        name,
        city,
        description,
        local,
        organizer: {
          connect: {
            id: userID
          }
        }
      }
      
    })

    return response.json(event);
  }
}