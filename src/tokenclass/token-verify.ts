import { prismaClient } from "../controller/database/prismaClient";

const jwt = require("jsonwebtoken");

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const tokenverify = (authHeader?: String) => {
    try
    {
        if(!authHeader)
        {
        throw new Error('JWT token is missing');
        }

        const [, token] = authHeader.split(' ');

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        
        if(!decoded)
        {
            throw new Error('Invalid Token. ');
        }

        const user = prismaClient.user.findUnique({
            where:{
                id: decoded.user_id,
            }
        })

        if(!user)
        {
            throw new Error('User not found. ');
        }
        
        const { sub } = decoded as ITokenPayload;
        return Number(sub)
    }
    catch (err)
    {
        console.log(err)
    }

}