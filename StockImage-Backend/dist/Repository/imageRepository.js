import Image from '../Models/imageModel.js';
import { BaseRepository } from "../Repository/baseRepository.js";
import mongoose from 'mongoose';
export class ImageRepository extends BaseRepository {
    constructor() {
        super(Image);
        this._imageModel = Image;
    }
    async uploadImages(imageData) {
        const result = await this._imageModel.insertMany(imageData);
        if (result)
            return true;
        else
            return false;
    }
    async fetchImages(userId) {
        const images = await this._imageModel.find({ userId }, { image: 1, title: 1, order: 1 });
        return images;
    }
    async updateImage(imageData) {
        const id = new mongoose.Types.ObjectId(imageData.imageId);
        console.log("Image Data ::", imageData);
        const res = await this._imageModel.findByIdAndUpdate(id, {
            $set: {
                image: imageData.image,
                title: imageData.title,
            }
        }, { new: true });
        console.log(" Updated :: ", res);
        return res;
    }
    async saveImageOrder(images) {
        try {
            const bulkOps = images.map(image => ({
                updateOne: {
                    filter: { _id: image._id },
                    update: { $set: { order: image.order } }
                }
            }));
            const res = await this._imageModel.bulkWrite(bulkOps);
            return res.modifiedCount > 0;
        }
        catch (err) {
            throw err;
        }
    }
}
