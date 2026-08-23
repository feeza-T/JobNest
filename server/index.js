import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();


// middleware

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());


// MongoDB

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vyo7g.mongodb.net/?appName=Cluster0`
);

const db = client.db("jobnest");

const jobsCollection = db.collection("jobs");


// Get all jobs

app.get("/jobs", async (req, res) => {
  const result = await jobsCollection.find().toArray();

  res.send(result);
});


// MongoDB connection

export async function connectToMongoDB() {
  try {
    await client.connect();

    console.log("You successfully connected to MongoDB!");

    return client;
  } catch (err) {
    console.dir(err);
  }
}


// Home route

app.get("/", (req, res) => {
  res.send("Hello from me.....");
});


// Start

connectToMongoDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});