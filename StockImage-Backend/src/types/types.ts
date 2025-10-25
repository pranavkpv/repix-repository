import { LoginResponseDto } from '../DTO/Reponse/LoginResponse.js';
import mongoose from 'mongoose';
import { ImageOrderDto } from '../DTO/Request/ImageOrderDto.js';

export type TUserData = {
   _id:string;
   name:string;
   phone:string;
   email:string;
   password:string;
}

export type TokenPayload ={
    id:string;
}

export type TLoginResponse = {
   userData: LoginResponseDto;
   accessToken: string;
   refreshToken: string;
}

export type TImageData = {
   _id:mongoose.Types.ObjectId;
   image:string;
   title:string;
   order:number;
}

export type TImageOrder ={
   _id:string;
   image:string;
   title:string;
   order:number;
}
