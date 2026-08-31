import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
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
app.use(cookieParser());

// MongoDB
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vyo7g.mongodb.net/?appName=Cluster0`
);

const db = client.db("jobnest");

const jobsCollection = client.db('jobnest').collection("jobs");
const bidsCollection = client.db('jobnest').collection("bids");


//JWT generate
app.post('/jwt' , async(req,res)=>{
  const user = req.body
  const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET ,{
    expiresIn : '365d'
  })
  res.cookie('token' , token , {
   httpOnly: true,
    secure: false,
    sameSite: "lax"
   }) . send ({success : true })
})

//clear token from logout
app.get('/logout' , (req,res)=>{
  res.clearCookie('token' ,  {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  }) 
  . send ({success : true })

})

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

//update job details
app.put('/job/:id' , async (req,res)=>{
  const id = req.params.id
  const jobData = req.body
  const query = { _id:new ObjectId(id)}
  const options = {upsert : true} //if the data is not initially write, but want to write in update section ,use upsert= true
  const updateDoc = {
    $set: {
      ...jobData,    //full jobdata updates
    },
  }
  const result = await jobsCollection.updateOne(query,updateDoc,options)
   res.send(result)
})

//get all bids for a user by email from db
app.get('/my-bids/:email', async(req, res)=>{
  const email = req.params.email
  const query = {email : email }
  const result = await bidsCollection.find(query).toArray()
  res.send(result)
})

//get all bid requests from db for job owner->buyers email
app.get('/bid-requests/:email', async (req, res) => {
  const email = req.params.email

  const query = {
    buyer_email: email
  }
  const result = await bidsCollection.find(query).toArray()

  res.send(result)
})



//update Bid Status
app.patch('/bid/:id', async (req,res)=>{
  const id = req.params.id
  const status = req.body
  const query = {_id : new ObjectId(id)}
  const updateDoc = {
    $set : status, 
  }
    const result = await bidsCollection.updateOne(query,updateDoc)
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