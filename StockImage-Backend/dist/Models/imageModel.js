import mongoose, { Schema } from 'mongoose';
const ImageSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const Image = mongoose.model('Image', ImageSchema);
export default Image;
