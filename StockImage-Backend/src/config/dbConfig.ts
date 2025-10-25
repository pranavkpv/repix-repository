import mongoose from 'mongoose';

const connectDB = async () : Promise<void> => {
    try{
         const URI = process.env.MONGO_DB_URI!;
        
         if(URI) {
             const conn = await mongoose.connect(URI);
             console.log(`Mongodb connected`);
         }else{
            console.log('Connection string error...');
         }
        
    }catch(err: unknown){
        if(err instanceof Error){
            console.log('Error in MOngoDB : ',err.message);
        }else{
            console.error('Unexpected Error :',err);
        }
        process.exit(1);
    }
}

export default connectDB;