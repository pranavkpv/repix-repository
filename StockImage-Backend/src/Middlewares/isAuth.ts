import { Request, Response ,NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCode } from '../enum/StatusCode.js';
import { StatusMessage } from '../enum/StatusMessage.js';

interface AuthenticatedRequest extends Request {
     user ?: string
}

export function auth(req : AuthenticatedRequest, res: Response, next: NextFunction){
   try {   
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token ::",token);
     if(!token){
         res.status(StatusCode.UNAUTHORIZED)
         .json({success:false, message:StatusMessage.UNAUTHORIZED})  
         return;
     }
     const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET!
     ) as JwtPayload;
     req.user=decoded.id;
     next();
}catch(err){
  res.status(StatusCode.UNAUTHORIZED)
     .json({success:false,message:StatusMessage.INVALID}) 
}
}

