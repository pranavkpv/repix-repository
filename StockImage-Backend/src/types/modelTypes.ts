import mongoose,{ Document } from 'mongoose';

export interface IUser extends Document  {
    name:string;
    email:string;
    password:string;
    phone: string;
}

export interface Iimage extends Document {
    userId:mongoose.Types.ObjectId,
    image:string;
    title:string;
    order:number;
}