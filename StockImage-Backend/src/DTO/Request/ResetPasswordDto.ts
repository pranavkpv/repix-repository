import { IsNotEmpty, IsString, Length ,Matches} from "class-validator";
import { Expose, Transform } from 'class-transformer'
import { Types } from 'mongoose';

export class ResetPasswordDto{
    @Expose()
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    @Transform(({value}) => new Types.ObjectId(value))
    userId!:string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,{
        message:'Password must contain letters and numbers'
    })
    oldPassword!:string;
   
    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(8,20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,{
        message:'Password must contain letters and numbers'
    })
    newPassword!:string;
}