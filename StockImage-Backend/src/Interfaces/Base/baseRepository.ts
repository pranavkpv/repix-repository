export interface IBaseRepository<T>{
    createNewData(data:Partial<T>):Promise<T>
    deleteData(data:Partial<T>):Promise<T | null>;
    getOneData(data:Partial<T>):Promise<T | null>;
}