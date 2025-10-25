import mongoose , { Schema } from 'mongoose';
import { IUser } from '../types/modelTypes.js';

const UserSchema: Schema<IUser>  = new mongoose.Schema(
    {
        name:{
             type:String,
             required:true,
        },
        email : {
            type:String,
            required:true,
            unique:true,
        },
        phone:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        }
    },
    { timestamps : true }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;