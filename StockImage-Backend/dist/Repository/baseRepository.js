export class BaseRepository {
    constructor(_model) {
        this._model = _model;
    }
    async createNewData(data) {
        return await this._model.create(data);
    }
    async deleteData(data) {
        const res = await this._model.findByIdAndDelete(data._id);
        return res;
    }
    async getOneData(data) {
        return await this._model.findById(data._id);
    }
}
