import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ImageUploadDto } from '../DTO/Request/imageUploadDTO.js';
import  { Types }  from 'mongoose';

export async function imageUploadMapper(req : Request):Promise<ImageUploadDto[]>{
    try{
        const files: Express.Multer.File[] = Array.isArray(req.files) ? req.files : [];
        const { titles, orders, userId } = req.body;

        const parsedTitles: string[] = JSON.parse(titles);
        const parsedOrders: number[] = JSON.parse(orders);

        const dtos: ImageUploadDto[] = files.map((file, i) =>
        plainToInstance(ImageUploadDto, {
            userId: new Types.ObjectId(userId),
            image: file.filename,
            title: parsedTitles[i],
            order: parsedOrders[i],
        })
        );
        for(const dto of dtos){
             await validateOrReject(dto);
        }
        return dtos;
    }catch(err){
        throw err; 
    }
}