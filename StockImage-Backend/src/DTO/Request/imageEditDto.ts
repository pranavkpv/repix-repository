import { IsString ,IsNotEmpty} from 'class-validator';

export class ImageEditDto{
    
    @IsNotEmpty()
    imageId!:string;
    
    @IsNotEmpty()
    @IsString()
    image!:string;

    @IsNotEmpty()
    @IsString()
    title!:string;
}