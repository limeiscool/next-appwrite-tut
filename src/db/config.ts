import mongoose from "mongoose";

const connection: { isConnected?: number } = {}

export async function connect() {
  if (connection.isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    connection.isConnected = db.connections[0].readyState;
    
    const dbConnection = mongoose.connection;

    dbConnection.on("connected", () => {
      console.log("Connected to MongoDB database");
    });

    dbConnection.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database")
    console.log(error);
  }
}