import { MongoClient } from "mongodb";

const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "Social-Hiking";
let database = null;

export async function connectDB() {
  // if not null (already connected) simply return the database
  if (database) return database;

  try {
    const client = new MongoClient(dbUrl);
    await client.connect();
    console.log("Connected to database!");
    database = client.db(dbName);
    return database;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!database) {
    throw new Error("Error fetching database");
  }
  return database;
}
