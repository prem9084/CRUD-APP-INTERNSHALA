import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb database connected sucessfully ${db.connection.host}`);
  } catch (error) {
    console.log(`Error  connectin${error}`);
  }
};

export default connectDb;
