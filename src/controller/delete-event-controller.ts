import { Request, Response } from "express";
import { tokenverify } from "../tokenclass/token-verify";
import { prismaClient } from "./database/prismaClient";


export class DeleteEventController{
    async handle(request: Request, response: Response){

      const {event} = request.body;

      const userID = tokenverify(request.headers.authorization)

      const deleteevent = await prismaClient.event.findUnique({
        where:{
          name : event
        }
      })

      if(!deleteevent){
        return response.status(400).json({ success: false, error: "Event not found"});
      }

      if(userID == deleteevent.userId)
      {
      await prismaClient.event.delete({
            where: {
              id: deleteevent.id,
            },
        });
      }
        
      return response.status(200).json({ success: true , error : "Event deleted successfully"});
    }
}