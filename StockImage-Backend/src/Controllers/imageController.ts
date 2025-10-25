import { inject, injectable } from "inversify";
import { IimageService } from "../Interfaces/Image/IimageService.js";
import { StatusMessage } from "../enum/StatusMessage.js";
import { StatusCode } from "../enum/StatusCode.js";
import { Request, Response, NextFunction } from "express";
import { imageUploadMapper } from "../Mapping/imageUpload.js";
import { imageEditMapper } from "../Mapping/editImageMapper.js";
import { imageOrderChangeMapper } from '../Mapping/orderChange.js';
import { ImageOrderDto } from "../DTO/Request/ImageOrderDto.js";

@injectable() 
export class ImageController {
  constructor(
    @inject("IimageService") private readonly _imageService: IimageService
  ) {}

  uploadImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtos = await imageUploadMapper(req);
      const result = await this._imageService.uploadImages(dtos);
      if (result) {
        res
          .status(StatusCode.OK)
          .json({ success: true, message: StatusMessage.SUCCESS });
      } else {
        res
          .status(StatusCode.FORBIDDEN)
          .json({ success: false, message: StatusMessage.FAILURE });
      }
    } catch (err){
      next(err);
    }
  };
  fetchImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Fetch imaged controller ");
      const { userId } = req.params;
      if(!userId) {
        res
          .status(StatusCode.BAD_REQUEST)
          .json({ success: false, message: StatusMessage.FAILURE });
        4;
        return;
      }
      const images = await this._imageService.fetchImages(userId);
      console.log("Images =", images);
      if (images) {
        res.status(StatusCode.OK).json({ success: true, images });
      } else {
        res.status(StatusCode.NO_CONTENT).json({ success: true });
      }
    } catch (err) {
      next(err);
    }
  };
  deleteImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.params;
      const result = await this._imageService.deleteImage(imageId);
      if (result) {
        res
          .status(StatusCode.OK)
          .json({ success: true, message: StatusMessage.SUCCESS });
      } else {
        res
          .status(StatusCode.BAD_REQUEST)
          .json({ success: false, message: StatusMessage.FAILURE });
      }
    } catch (err) {
      next(err);
    }
  };
  updateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await imageEditMapper(req);
      const image = await this._imageService.updateImage(dto);
      console.log("Image update::",image);
      if(image){
        res.status(StatusCode.OK).json({success:true,message:StatusMessage.SUCCESS,image})
      }else{
        res.status(StatusCode.BAD_REQUEST).json({success:false,message:StatusMessage.FAILURE});
      }
    } catch (err) {
      next(err);
    }
  };
  saveOrder = async(req: Request, res: Response,next : NextFunction) =>{
     try{
        console.log('Save order Change !');
        const imageValues : ImageOrderDto[] = await imageOrderChangeMapper(req);
        const result = await this._imageService.saveImageOrder(imageValues);
        if(result){
            res.status(StatusCode.OK).json({success:true,message:StatusMessage.SUCCESS});
        }else{
            res.status(StatusCode.OK).json({success:false,message:StatusMessage.FAILURE});
        }
    }catch(err){ 
      next(err);
   }
 }
}
