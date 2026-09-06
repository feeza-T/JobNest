
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

dotenv.config()

const port = process.env.PORT || 9000

const app = express()

// =========================
// Middleware
// =========================

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


// =========================
// Verify JWT Middleware
// =========================

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized access",
    })
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log(err)

        return res.status(401).send({
          message: "Unauthorized access",
        })
      }

      console.log("Decoded JWT:", decoded)

      req.user = decoded

      next()
    }
  )
}


// =========================
// MongoDB
// =========================

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vyo7g.mongodb.net/?appName=Cluster0`
)

const db = client.db("jobnest")

const jobsCollection = db.collection("jobs")
const bidsCollection = db.collection("bids")


// =========================
// Generate JWT
// =========================

app.post("/jwt", async (req, res) => {
  const user = req.body

  const token = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "365d",
    }
  )

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .send({
      success: true,
    })
})


// =========================
// Logout
// =========================

app.get("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .send({
      success: true,
    })
})


// =========================
// Get All Jobs
// =========================

app.get("/jobs", async (req, res) => {
  const result = await jobsCollection.find().toArray()

  res.send(result)
})


// =========================
// Get Single Job
// =========================

app.get("/job/:id", async (req, res) => {
  const id = req.params.id

  const query = {
    _id: new ObjectId(id),
  }

  const result = await jobsCollection.findOne(query)

  res.send(result)
})


// =========================
// Save Bid Data
// =========================

app.post("/bid", async (req, res) => {
  const bidData = req.body

  console.log("Bid Data:", bidData)

  const result = await bidsCollection.insertOne(bidData)

  res.send(result)
})


// =========================
// Save Job
// =========================

app.post("/job", async (req, res) => {
  const jobData = req.body

  console.log("Job Data:", jobData)

  const result = await jobsCollection.insertOne(jobData)

  res.send(result)
})


// =========================
// Get Jobs Posted By Specific User
// =========================

app.get("/jobs/:email", verifyToken, async (req, res) => {
  const tokenEmail = req.user.email
  const email = req.params.email

  console.log("Token Email:", tokenEmail)
  console.log("Requested Email:", email)

  // Check if logged-in user owns these jobs
  if (tokenEmail !== email) {
    return res.status(403).send({
      message: "Forbidden access",
    })
  }

  // Find jobs posted by this user
  const query = {
    "buyer.email": email,
  }

  const result = await jobsCollection.find(query).toArray()

  console.log("My Posted Jobs:", result)

  res.send(result)
})


// =========================
// Delete Job
// =========================

app.delete("/jobs/:id", async (req, res) => {
  const id = req.params.id

  const query = {
    _id: new ObjectId(id),
  }

  const result = await jobsCollection.deleteOne(query)

  res.send(result)
})


// =========================
// Update Job
// =========================

app.put("/job/:id", async (req, res) => {
  const id = req.params.id
  const jobData = req.body

  const query = {
    _id: new ObjectId(id),
  }

  const options = {
    upsert: true,
  }

  const updateDoc = {
    $set: {
      ...jobData,
    },
  }

  const result = await jobsCollection.updateOne(
    query,
    updateDoc,
    options
  )

  res.send(result)
})


// =========================
// Get My Bids
// =========================

app.get("/my-bids/:email", verifyToken, async (req, res) => {
  const tokenEmail = req.user.email
  const email = req.params.email

  // User can only access their own bids
  if (tokenEmail !== email) {
    return res.status(403).send({
      message: "Forbidden access",
    })
  }

  const query = {
    email: email,
  }

  const result = await bidsCollection.find(query).toArray()

  res.send(result)
})


// =========================
// Get Bid Requests
// =========================

app.get(
  "/bid-requests/:email",
  verifyToken,
  async (req, res) => {
    const tokenEmail = req.user.email
    const email = req.params.email

    // User can only access their own bid requests
    if (tokenEmail !== email) {
      return res.status(403).send({
        message: "Forbidden access",
      })
    }

    const query = {
      buyer_email: email,
    }

    const result = await bidsCollection.find(query).toArray()

    res.send(result)
  }
)


// =========================
// Update Bid Status
// =========================

app.patch("/bid/:id", verifyToken, async (req, res) => {
  const id = req.params.id
  const status = req.body

  const query = {
    _id: new ObjectId(id),
  }

  const updateDoc = {
    $set: status,
  }

  const result = await bidsCollection.updateOne(
    query,
    updateDoc
  )

  res.send(result)
})


// =========================
// MongoDB Connection
// =========================

export async function connectToMongoDB() {
  try {
    await client.connect()

    console.log("You successfully connected to MongoDB!")

    return client
  } catch (err) {
    console.dir(err)
  }
}


// =========================
// Home Route
// =========================

app.get("/", (req, res) => {
  res.send("Hello from me.....")
})


// =========================
// Start Server
// =========================

connectToMongoDB()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

