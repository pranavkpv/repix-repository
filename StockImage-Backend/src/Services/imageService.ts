import { inject, injectable } from 'inversify';
import { IimageRepository } from '../Interfaces/Image/IimageRepository.js';
import { IimageService } from '../Interfaces/Image/IimageService.js';
import { ImageUploadDto } from '../DTO/Request/imageUploadDTO.js';
import { TImageData } from '../types/types.js';
import { plainToInstance } from 'class-transformer';
import { ImageDataDto} from '../DTO/Reponse/ImageFetchDto.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ImageEditDto } from '../DTO/Request/imageEditDto.js';
import { EditImageResponseDto } from '../DTO/Reponse/ImageEditResponseDto.js';
import { ImageOrderDto } from '../DTO/Request/ImageOrderDto.js';

@injectable()
export class ImageService implements IimageService{
    constructor(
        @inject ('IimageRepository') private readonly _imageRepository : IimageRepository
    ){}

    async uploadImages(imageData :ImageUploadDto[]):Promise<boolean>{
        console.log('Image upload service',imageData);
        const res = await this._imageRepository.uploadImages(imageData);
        return res;
    }
    async fetchImages(userId:string):Promise<TImageData[] | null>{
        try{
             const images : TImageData[] | null= await this._imageRepository.fetchImages(userId);
             console.log("Images ::",images);
             if(images){
                const imageDtos : ImageDataDto[] = plainToInstance(ImageDataDto, images);
                return images.sort((a,b) => a.order - b.order);
             }
             return null;
        }catch(err){
            throw err;
        }
    }
    async deleteImage(imageId:string):Promise<boolean>{
        try{
              const res = await this._imageRepository.deleteData({_id:imageId});
              if(res){
                return  await this.deleteImageFromDisk(res.image);
              }else return false;
        }catch(err){
            throw err;
        }
    }
    async updateImage(imageData: ImageEditDto):Promise<EditImageResponseDto | null>{
        const res = await this._imageRepository.getOneData({_id:imageData.imageId});
        if(res){ 
          await this.deleteImageFromDisk(res?.image);
          console.log("Before Edit  after mapper :: ",imageData);
          const editedImage =  await this._imageRepository.updateImage(imageData);
          console.log("After Edit Images :",editedImage);
          const image = plainToInstance(EditImageResponseDto,editedImage,{
                                     excludeExtraneousValues: true });
          console.log("After mapping ::",image);  
          return image;
        }
        return null;
    }
    async deleteImageFromDisk(imageName : string){
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const filePath = path.join(dirname,'../../uploads',imageName);
        console.log('File Name ::',filePath);
        fs.unlink(filePath, (err) =>{
            if(err) console.warn("File not found on disk!");
            return false;
        });
        return true;
    }
    async saveImageOrder(imageData : ImageOrderDto[]):Promise<boolean>{
        try{
                console.log("Data Images ::",imageData);
                const res = await this._imageRepository.saveImageOrder(imageData);
                return res;
        }catch(err){
            throw err;
        }
    }
}