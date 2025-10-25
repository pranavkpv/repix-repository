import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { ImageEditDto } from '../DTO/Request/imageEditDto.js';
import { validateOrReject } from 'class-validator';

export async function imageEditMapper(req: Request):Promise<ImageEditDto>{
  try{   
   if (!req.file) {
      throw new Error('No file uploaded');
   }
   console.log('Inside Mapper ');
   const file: Express.Multer.File = req.file;

   const { title } = req.body;
   const { imageId } = req.params;

   const dto :ImageEditDto = plainToInstance(ImageEditDto,{
      imageId,
      image : file.filename,
      title : JSON.parse(title),
   });
   await validateOrReject(dto);
   return dto;
}catch(err){
     console.log('Error in Image Edit Mapping ::',err);
     throw err;
}
}