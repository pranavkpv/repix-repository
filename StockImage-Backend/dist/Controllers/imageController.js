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
import { inject, injectable } from "inversify";
import { StatusMessage } from "../enum/StatusMessage.js";
import { StatusCode } from "../enum/StatusCode.js";
import { imageUploadMapper } from "../Mapping/imageUpload.js";
import { imageEditMapper } from "../Mapping/editImageMapper.js";
import { imageOrderChangeMapper } from '../Mapping/orderChange.js';
let ImageController = class ImageController {
    constructor(_imageService) {
        this._imageService = _imageService;
        this.uploadImages = async (req, res, next) => {
            try {
                const dtos = await imageUploadMapper(req);
                const result = await this._imageService.uploadImages(dtos);
                if (result) {
                    res
                        .status(StatusCode.OK)
                        .json({ success: true, message: StatusMessage.SUCCESS });
                }
                else {
                    res
                        .status(StatusCode.FORBIDDEN)
                        .json({ success: false, message: StatusMessage.FAILURE });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.fetchImages = async (req, res, next) => {
            try {
                console.log("Fetch imaged controller ");
                const { userId } = req.params;
                if (!userId) {
                    res
                        .status(StatusCode.BAD_REQUEST)
                        .json({ success: false, message: StatusMessage.FAILURE });
                    4;
                    return;
                }
                const images = await this._imageService.fetchImages(userId);
                console.log("Images =", images);
                if (images) {
                    res.status(StatusCode.OK).json({ success: true, images });
                }
                else {
                    res.status(StatusCode.NO_CONTENT).json({ success: true });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.deleteImages = async (req, res, next) => {
            try {
                const { imageId } = req.params;
                const result = await this._imageService.deleteImage(imageId);
                if (result) {
                    res
                        .status(StatusCode.OK)
                        .json({ success: true, message: StatusMessage.SUCCESS });
                }
                else {
                    res
                        .status(StatusCode.BAD_REQUEST)
                        .json({ success: false, message: StatusMessage.FAILURE });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.updateImage = async (req, res, next) => {
            try {
                const dto = await imageEditMapper(req);
                const image = await this._imageService.updateImage(dto);
                console.log("Image update::", image);
                if (image) {
                    res.status(StatusCode.OK).json({ success: true, message: StatusMessage.SUCCESS, image });
                }
                else {
                    res.status(StatusCode.BAD_REQUEST).json({ success: false, message: StatusMessage.FAILURE });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.saveOrder = async (req, res, next) => {
            try {
                console.log('Save order Change !');
                const imageValues = await imageOrderChangeMapper(req);
                const result = await this._imageService.saveImageOrder(imageValues);
                if (result) {
                    res.status(StatusCode.OK).json({ success: true, message: StatusMessage.SUCCESS });
                }
                else {
                    res.status(StatusCode.OK).json({ success: false, message: StatusMessage.FAILURE });
                }
            }
            catch (err) {
                next(err);
            }
        };
    }
};
ImageController = __decorate([
    injectable(),
    __param(0, inject("IimageService")),
    __metadata("design:paramtypes", [Object])
], ImageController);
export { ImageController };
