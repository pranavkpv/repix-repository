var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { ImageDataDto } from '../DTO/Reponse/ImageFetchDto.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { EditImageResponseDto } from '../DTO/Reponse/ImageEditResponseDto.js';
let ImageService = class ImageService {
    constructor(_imageRepository) {
        this._imageRepository = _imageRepository;
    }
    async uploadImages(imageData) {
        console.log('Image upload service', imageData);
        const res = await this._imageRepository.uploadImages(imageData);
        return res;
    }
    async fetchImages(userId) {
        try {
            const images = await this._imageRepository.fetchImages(userId);
            console.log("Images ::", images);
            if (images) {
                const imageDtos = plainToInstance(ImageDataDto, images);
                return images.sort((a, b) => a.order - b.order);
            }
            return null;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteImage(imageId) {
        try {
            const res = await this._imageRepository.deleteData({ _id: imageId });
            if (res) {
                return await this.deleteImageFromDisk(res.image);
            }
            else
                return false;
        }
        catch (err) {
            throw err;
        }
    }
    async updateImage(imageData) {
        const res = await this._imageRepository.getOneData({ _id: imageData.imageId });
        if (res) {
            await this.deleteImageFromDisk(res?.image);
            console.log("Before Edit  after mapper :: ", imageData);
            const editedImage = await this._imageRepository.updateImage(imageData);
            console.log("After Edit Images :", editedImage);
            const image = plainToInstance(EditImageResponseDto, editedImage, {
                excludeExtraneousValues: true
            });
            console.log("After mapping ::", image);
            return image;
        }
        return null;
    }
    async deleteImageFromDisk(imageName) {
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const filePath = path.join(dirname, '../../uploads', imageName);
        console.log('File Name ::', filePath);
        fs.unlink(filePath, (err) => {
            if (err)
                console.warn("File not found on disk!");
            return false;
        });
        return true;
    }
    async saveImageOrder(imageData) {
        try {
            console.log("Data Images ::", imageData);
            const res = await this._imageRepository.saveImageOrder(imageData);
            return res;
        }
        catch (err) {
            throw err;
        }
    }
};
ImageService = __decorate([
    injectable(),
    __param(0, inject('IimageRepository')),
    __metadata("design:paramtypes", [Object])
], ImageService);
export { ImageService };
