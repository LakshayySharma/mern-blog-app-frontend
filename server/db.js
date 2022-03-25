import mongoose from "mongoose";
const connectDb = async () => {
  await mongoose.connect(process.env.MONGOPROD, {}, (err, db) => {
    try {
      console.log(`connection successfull`);
    } catch (error) {
      console.log(error);
    }
  });
};
export default connectDb;
