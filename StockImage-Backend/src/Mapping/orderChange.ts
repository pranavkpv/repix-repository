import { Request } from 'express';
import { CustomError } from '../utils/error.js';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ImageOrderDto } from '../DTO/Request/ImageOrderDto.js';
import { TImageOrder } from '../types/types.js';

export async function imageOrderChangeMapper(req : Request):Promise<ImageOrderDto[]>{
    try{
            const { images } = req.body;
            if(!images){
                throw new CustomError("Missing Field");
            } 
            const dtos : ImageOrderDto[]=  images.map((image : TImageOrder) => plainToInstance(ImageOrderDto,image));
            for(let dto of dtos){ 
               await validateOrReject(dto, { whitelist: true, 
                                         forbidNonWhitelisted: true});
             }
            return dtos;
        
    }catch(err){
        throw err;
    }
}