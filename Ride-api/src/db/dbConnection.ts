import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number;
};
const connection:ConnectionObject={};
const dbConnect=async()=>{
    if(connection.isConnected){
        console.log("Already connected to the database");
        return;
    }
    try{
        const db=await mongoose.connect(process.env.MONGODB_URI as string||"",{});
        connection.isConnected=db.connections[0].readyState;
        console.log(`MongoDb connected!!!`);
    }
    catch(error){
        console.error(`MongoDb connection failed??? with ${error}`);
    }
}
export default dbConnect;