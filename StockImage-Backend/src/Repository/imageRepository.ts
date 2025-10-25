import { IimageRepository } from "../Interfaces/Image/IimageRepository.js";
import Image from '../Models/imageModel.js';
import { Iimage } from '../types/modelTypes.js';
import {  TImageData } from '../types/types.js';
import { BaseRepository } from "../Repository/baseRepository.js";
import { ImageUploadDto } from "../DTO/Request/imageUploadDTO.js";
import { ImageEditDto } from "../DTO/Request/imageEditDto.js";
import mongoose from 'mongoose';
import { ImageOrderDto } from "../DTO/Request/ImageOrderDto.js";

export class ImageRepository extends BaseRepository<Iimage> implements IimageRepository{
    constructor(){
         super(Image)
    }
    private readonly _imageModel = Image;
    async uploadImages(imageData :ImageUploadDto[]):Promise<boolean>{
         const result = await this._imageModel.insertMany(imageData);
         if(result) return true;
         else return false;
    }
    async fetchImages(userId : string):Promise<TImageData[] | null>{
      const images : TImageData [] = await this._imageModel.find({userId},{image:1, title:1, order:1});
      return images;
    }
    async updateImage(imageData:ImageEditDto):Promise<TImageData | null>{ 
     const id = new mongoose.Types.ObjectId(imageData.imageId);
     console.log("Image Data ::",imageData);
     const res : TImageData | null = await this._imageModel.findByIdAndUpdate(id,{
          $set:{
               image:imageData.image,
               title:imageData.title,
          } },
          {new : true} );
     console.log(" Updated :: ",res);     
     return res;
   }
   async saveImageOrder(images : ImageOrderDto[]):Promise<boolean>{
      try{
          const bulkOps = images.map( image => ({
                updateOne:{
                    filter:{ _id: image._id },
                    update:{ $set: {order: image.order}}
                }
              }));
          const res = await this._imageModel.bulkWrite(bulkOps);   
          return res.modifiedCount>0;
      }catch(err){
          throw err;
      }
   }
}