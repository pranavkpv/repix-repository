import { inject, injectable} from 'inversify';
import { IAuthService } from '../Interfaces/Auth/authService.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enum/StatusCode.js';
import { StatusMessage } from '../enum/StatusMessage.js';

@injectable()
export class AuthController{
    constructor(
        @inject('IAuthService') private readonly _authService : IAuthService
    ){}
     register = async (req: Request, res:Response,next : NextFunction) => {
       try{  
        console.log("Request id ::",req.body );
       
        const result = await this._authService.register(req.body);
        if(result){
            res.status(StatusCode.CREATED).json({message:StatusMessage.SUCCESS});
        }else{
            res.status(StatusCode.FORBIDDEN).json({message:StatusMessage.FAILURE})
        }
    }catch(err){
        next(err);
    } 
    }
    login = async(req: Request, res: Response, next: NextFunction) =>{
      try{   
        console.log('Login Details ::',req.body);
        const result = await this._authService.login(req.body);
        if(result){
             res.cookie("token",result.refreshToken,{
                  httpOnly: true,
                  sameSite: "none",
                  secure: true,
                  maxAge: 10*24*60*60*1000,
             }) 
             res.status(StatusCode.OK).json({message:StatusMessage.SUCCESS,loginData:result});
        }else{
            res.status(StatusCode.FORBIDDEN).json({message:StatusMessage.FAILURE})
        }
    }catch(err){
        next(err);
    } 
    }
    getAccessToken = async(req: Request, res:Response,next: NextFunction) =>{
        try{
        if(!req.cookies || !req.cookies.token){
            res.status(StatusCode.BAD_REQUEST).json({message:StatusMessage.SUCCESS});
            return;
        }
        const refreshToken = req.cookies.token;
        const accessToken = await this._authService.getAccessToken(refreshToken);
        if(accessToken){ 
             res.status(StatusCode.OK).json({success:true,accessToken});
        }else{
            res.status(StatusCode.UNAUTHORIZED).json({success:false,message:StatusMessage.REFRESH_TOKEN_EXPIRED});
        }     
        }catch(err){
            next(err)
        }
    }
    logout =async(req: Request, res: Response,next: NextFunction) => {
       try{  
            res.clearCookie('token',{httpOnly:true,secure:true,sameSite:"strict",});
            res.status(StatusCode.OK).json({success:true,message:StatusMessage.LOGOUT_SUCCESS});
        }catch(err){
            next(err);
        }
    }
    resetPassword = async(req:Request, res: Response, next :NextFunction) =>{
         try{
            console.log("Data received ::",req.body);
            const result = await this._authService.resetPassword(req.body);
            let message;
            let statusCode;
            switch(result){
               case 1:
                      statusCode = StatusCode.BAD_REQUEST;
                      message = StatusMessage.FAILURE;
                      break;
                case 2:    
                      statusCode = StatusCode.BAD_REQUEST;
                      message = StatusMessage.INVALID_OLD_PASSWORD;
                      break;    
                case 3:
                      statusCode = StatusCode.OK;
                      message = StatusMessage.RESET_SUCCESS;
                      break;
                case 4:
                     statusCode = StatusCode.BAD_REQUEST;
                     message = StatusMessage.FAILURE;
                     break;            
                default:
                     statusCode = StatusCode.BAD_REQUEST;
                     message = StatusMessage.FAILURE;
                     break;
            }
            res.status(statusCode).json({success:true,message});
         }catch(err){
            next(err);
         }
    }
}
