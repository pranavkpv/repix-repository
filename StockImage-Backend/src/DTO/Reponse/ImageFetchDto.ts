import  { Expose , Transform ,  Type} from 'class-transformer';
import { IsArray, ValidateNested, IsNotEmpty ,} from "class-validator"
export class ImageDto{

    @IsNotEmpty()
    @Transform(({obj}) => obj._id.toString())
    @Expose()
    id!:string;

    @Expose()
    image!:string;

    @Expose()
    title!:string;

    @Expose()
    order!:string;
}

export class ImageDataDto{
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ImageDto)
    images!:ImageDto[];
}