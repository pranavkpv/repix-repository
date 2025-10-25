import { ImageUploadDto } from "../../DTO/Request/imageUploadDTO.js";
import { TImageData } from '../../types/types.js';
import { ImageEditDto} from '../../DTO/Request/imageEditDto.js';
import { EditImageResponseDto } from "../../DTO/Reponse/ImageEditResponseDto.js";
import { ImageOrderDto } from "../../DTO/Request/ImageOrderDto.js";

export interface IimageService{
    uploadImages(imageData: ImageUploadDto[]):Promise<boolean>;
    fetchImages(userId : string) :Promise<TImageData[] | null>;
    deleteImage(imageId: string):Promise<boolean>;
    updateImage(imageData:ImageEditDto):Promise<EditImageResponseDto | null>;
    saveImageOrder(images : ImageOrderDto[]):Promise<boolean>;
}

