import { Model } from 'mongoose';
import { IBaseRepository } from '../Interfaces/Base/baseRepository.js';

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private readonly _model:Model<T>){}

    async createNewData(data :Partial<T>):Promise<T>{
         return await this._model.create(data);
    }
    async deleteData(data: Partial<T> & { _id: string }): Promise<T | null>{
        const res: T | null = await this._model.findByIdAndDelete(data._id);
        return res;
    }
   async getOneData(data: Partial<T> & { _id: string }): Promise<T | null> { 
     return await this._model.findById(data._id);
   }
}