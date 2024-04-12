import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB database");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database")
    console.log(error);
  }
}