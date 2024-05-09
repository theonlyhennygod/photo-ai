import mongoose from "mongoose";

const connectDB = (url) => {

    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.log(`error: ${error}`));
}
 
export default connectDB;