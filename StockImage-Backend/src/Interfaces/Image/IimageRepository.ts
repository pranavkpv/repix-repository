import { IBaseRepository } from "../Base/baseRepository.js";
import { Iimage, } from '../../types/modelTypes.js';
import { ImageUploadDto } from "../../DTO/Request/imageUploadDTO.js";
import { TImageData } from '../../types/types.js';
import { ImageEditDto } from "../../DTO/Request/imageEditDto.js";
import { ImageOrderDto } from '../../DTO/Request/ImageOrderDto.js';

export interface IimageRepository extends IBaseRepository<Iimage>{
    uploadImages(imageData : ImageUploadDto[]):Promise<boolean>
    fetchImages(userId : string):Promise<TImageData[] | null>
    updateImage(imageData:ImageEditDto):Promise<TImageData | null>;
    saveImageOrder(images : ImageOrderDto[]):Promise<boolean>
}