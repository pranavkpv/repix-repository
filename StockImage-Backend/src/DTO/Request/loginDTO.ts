import {
    IsEmail,
    Matches,
    Length,
    IsString
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class LoginDto{
    @Expose()
    @IsEmail()
    @Transform(({value}) => value.toLowerCase())
    email!:string;

    @Expose()
    @IsString()
    @Length(8,20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,{
        message:'Password must contain letters and numbers'
    })
    password!:string;
    
}