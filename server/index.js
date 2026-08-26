import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

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

const jobsCollection = client.db('jobnest').collection("jobs");
const bidsCollection = client.db('jobnest').collection("bids");


// Get all jobs

app.get("/jobs", async (req, res) => {
  const result = await jobsCollection.find().toArray();

  res.send(result);
});

//get a single job data(jobdetails page)
app.get('/job/:id', async(req, res)=>{
  const id = req.params.id
  //class er instance use korte hole new likha lage
  const query = {_id: new ObjectId(id)}
   const result = await jobsCollection.findOne(query);
  res.send(result)

})


//save a bid data in db
app.post('/bid' , async (req,res)=>{
  const bidData = req.body
  console.log(bidData)
  const result = await bidsCollection.insertOne(bidData)
  res.send(result)
})

//save a job post from add post
app.post('/job' , async (req,res)=>{
  const jobData = req.body
  console.log(jobData)
  const result = await jobsCollection.insertOne(jobData)
  res.send(result)
})


//get all jobs posted by me
app.get('/jobs/:email', async(req, res)=>{
  const email = req.params.email
  const query = {'buyer.email' : email }
  const result = await jobsCollection.find(query).toArray()
  res.send(result)
})

//delete a job data from my posted jobs page
app.delete('/jobs/:id', async(req, res)=>{
  const id = req.params.id
  const query = {_id : new ObjectId(id) }
  const result = await jobsCollection.deleteOne(query)
  res.send(result)
})

// ager tay job, etay jobs emne change kre nite hobe naile sob same route e jabe
// app.get('/jobs/:email', async(req, res)=>{
  
// })


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