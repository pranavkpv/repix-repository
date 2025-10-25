import mongoose, { Schema} from 'mongoose';
import { Iimage } from '../types/modelTypes.js';

const ImageSchema : Schema<Iimage> = new mongoose.Schema({
    userId:{
         type:Schema.Types.ObjectId,
         ref:'User',
         required:true,
    },
    image:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    order:{
        type:Number,
        required:true
    }
},{timestamps:true}
);

const Image = mongoose.model<Iimage>('Image',ImageSchema);
export default Image;