import { IsString, IsNotEmpty , IsInt,Min ,Max} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class ImageOrderDto{

     @IsNotEmpty()
     @Transform(({value}) => new Types.ObjectId(value))
     _id!:Types.ObjectId; 
     
    @IsNotEmpty()
    @IsString()
    image!:string;

    @IsNotEmpty()
    @IsString()
    title!:string;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(9)
    order!:number;
}