var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, ValidateNested, IsNotEmpty, } from "class-validator";
export class ImageDto {
}
__decorate([
    IsNotEmpty(),
    Transform(({ obj }) => obj._id.toString()),
    Expose(),
    __metadata("design:type", String)
], ImageDto.prototype, "id", void 0);
__decorate([
    Expose(),
    __metadata("design:type", String)
], ImageDto.prototype, "image", void 0);
__decorate([
    Expose(),
    __metadata("design:type", String)
], ImageDto.prototype, "title", void 0);
__decorate([
    Expose(),
    __metadata("design:type", String)
], ImageDto.prototype, "order", void 0);
export class ImageDataDto {
}
__decorate([
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ImageDto),
    __metadata("design:type", Array)
], ImageDataDto.prototype, "images", void 0);
