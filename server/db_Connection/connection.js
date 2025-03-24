import mongoose from "mongoose";

export const connection = async () => {
    mongoose.connect(`${process.env.MONGO_URI}/TaskDb`)
        .then(res => console.log("Connection Succeded!"))
        .catch(err => console.log(`Error Occured While Connecting to Db \n ${err}`));
}