import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} from "mongodb"

dotenv.config()

const app = express()
const port = process.env.PORT || 9000

// =====================================
// CORS
// =====================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://fir-auth-48bf7.web.app",
  process.env.CLIENT_URL,
].filter(Boolean)

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// =====================================
// Verify JWT Middleware
// =====================================

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
        console.log("JWT Error:", err)

        return res.status(401).send({
          message: "Unauthorized access",
        })
      }

      req.user = decoded
      next()
    }
  )
}

// =====================================
// MongoDB
// =====================================

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vyo7g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

// =====================================
// Main MongoDB Function
// =====================================

async function run() {
  try {
    await client.connect()

    console.log("Connected to MongoDB!")

    const jobsCollection = client
      .db("jobnest")
      .collection("jobs")

    const bidsCollection = client
      .db("jobnest")
      .collection("bids")

    // =====================================
    // Generate JWT
    // =====================================

    app.post("/jwt", async (req, res) => {
      try {
        const user = req.body

        if (!user?.email) {
          return res.status(400).send({
            message: "Email is required",
          })
        }

        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "365d",
          }
        )

        res
          .cookie("token", token, {
            httpOnly: true,
            secure:
              process.env.NODE_ENV ===
              "production",
            sameSite:
              process.env.NODE_ENV ===
              "production"
                ? "none"
                : "lax",
          })
          .send({
            success: true,
          })
      } catch (error) {
        console.log(error)

        res.status(500).send({
          message: "Failed to generate token",
        })
      }
    })

    // =====================================
    // Logout
    // =====================================

    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            "production",
          sameSite:
            process.env.NODE_ENV ===
            "production"
              ? "none"
              : "lax",
        })
        .send({
          success: true,
        })
    })

    // =====================================
    // Get All Jobs
    // =====================================

    app.get("/jobs", async (req, res) => {
      try {
        const result =
          await jobsCollection
            .find()
            .toArray()

        res.send(result)
      } catch (error) {
        console.log(error)

        res.status(500).send({
          message: "Failed to get jobs",
        })
      }
    })

    // =====================================
    // Get Jobs For Pagination
    // =====================================

    app.get("/all-jobs", async (req, res) => {
      try {
        const size =
          parseInt(req.query.size) || 6

        const page =
          parseInt(req.query.page) || 1

        const filter =
          req.query.filter || ""

        const sort =
          req.query.sort || ""

        const search =
          req.query.search || ""

        const query = {
          job_title: {
            $regex: search,
            $options: "i",
          },
        }

        if (filter) {
          query.category = filter
        }

        const sortOptions = {}

        if (sort === "asc") {
          sortOptions.deadline = 1
        }

        if (sort === "desc") {
          sortOptions.deadline = -1
        }

        let cursor =
          jobsCollection.find(query)

        if (sort) {
          cursor =
            cursor.sort(sortOptions)
        }

        const result = await cursor
          .skip((page - 1) * size)
          .limit(size)
          .toArray()

        res.send(result)
      } catch (error) {
        console.log(error)

        res.status(500).send({
          message: "Failed to load jobs",
        })
      }
    })

    // =====================================
    // Get Jobs Count
    // =====================================

    app.get(
      "/jobs-count",
      async (req, res) => {
        try {
          const filter =
            req.query.filter || ""

          const search =
            req.query.search || ""

          const query = {
            job_title: {
              $regex: search,
              $options: "i",
            },
          }

          if (filter) {
            query.category = filter
          }

          const count =
            await jobsCollection.countDocuments(
              query
            )

          res.send({
            count,
          })
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to count jobs",
          })
        }
      }
    )

    // =====================================
    // Get Single Job
    // =====================================

    app.get(
      "/job/:id",
      async (req, res) => {
        try {
          const id = req.params.id

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({
                message:
                  "Invalid job ID",
              })
          }

          const query = {
            _id: new ObjectId(id),
          }

          const result =
            await jobsCollection.findOne(
              query
            )

          if (!result) {
            return res
              .status(404)
              .send({
                message:
                  "Job not found",
              })
          }

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to get job",
          })
        }
      }
    )

    // =====================================
    // Save Job
    // =====================================

    app.post(
      "/job",
      verifyToken,
      async (req, res) => {
        try {
          const jobData = req.body

          // Prevent user from posting
          // a job using another email
          if (
            req.user.email !==
            jobData?.buyer?.email
          ) {
            return res
              .status(403)
              .send({
                message:
                  "Forbidden access",
              })
          }

          const newJob = {
            ...jobData,
            bid_count:
              jobData.bid_count || 0,
          }

          const result =
            await jobsCollection.insertOne(
              newJob
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to create job",
          })
        }
      }
    )

    // =====================================
    // Get Jobs Posted By User
    // =====================================

    app.get(
      "/jobs/:email",
      verifyToken,
      async (req, res) => {
        try {
          const tokenEmail =
            req.user.email

          const email =
            req.params.email

          if (tokenEmail !== email) {
            return res
              .status(403)
              .send({
                message:
                  "Forbidden access",
              })
          }

          const query = {
            "buyer.email": email,
          }

          const result =
            await jobsCollection
              .find(query)
              .toArray()

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to get posted jobs",
          })
        }
      }
    )

    // =====================================
    // Delete Job
    // =====================================

    app.delete(
      "/job/:id",
      verifyToken,
      async (req, res) => {
        try {
          const id = req.params.id

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({
                message:
                  "Invalid job ID",
              })
          }

          const job =
            await jobsCollection.findOne({
              _id: new ObjectId(id),
            })

          if (!job) {
            return res
              .status(404)
              .send({
                message:
                  "Job not found",
              })
          }

          if (
            job?.buyer?.email !==
            req.user.email
          ) {
            return res
              .status(403)
              .send({
                message:
                  "You can only delete your own job",
              })
          }

          const result =
            await jobsCollection.deleteOne(
              {
                _id: new ObjectId(id),
              }
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to delete job",
          })
        }
      }
    )

    // =====================================
    // Update Job
    // =====================================

    app.put(
      "/job/:id",
      verifyToken,
      async (req, res) => {
        try {
          const id = req.params.id
          const jobData = req.body

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({
                message:
                  "Invalid job ID",
              })
          }

          const job =
            await jobsCollection.findOne({
              _id: new ObjectId(id),
            })

          if (!job) {
            return res
              .status(404)
              .send({
                message:
                  "Job not found",
              })
          }

          if (
            job?.buyer?.email !==
            req.user.email
          ) {
            return res
              .status(403)
              .send({
                message:
                  "You can only update your own job",
              })
          }

          // Do not allow changing owner
          delete jobData._id
          delete jobData.buyer

          const updateDoc = {
            $set: {
              ...jobData,
            },
          }

          const result =
            await jobsCollection.updateOne(
              {
                _id: new ObjectId(id),
              },
              updateDoc
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to update job",
          })
        }
      }
    )

    // =====================================
    // Save Bid
    // =====================================

    app.post(
      "/bid",
      verifyToken,
      async (req, res) => {
        try {
          const incomingBid =
            req.body

          // User cannot submit using
          // another user's email
          if (
            req.user.email !==
            incomingBid.email
          ) {
            return res
              .status(403)
              .send({
                message:
                  "Forbidden access",
              })
          }

          if (
            !incomingBid.jobId ||
            !ObjectId.isValid(
              incomingBid.jobId
            )
          ) {
            return res
              .status(400)
              .send({
                message:
                  "Invalid job ID",
              })
          }

          const job =
            await jobsCollection.findOne({
              _id: new ObjectId(
                incomingBid.jobId
              ),
            })

          if (!job) {
            return res
              .status(404)
              .send({
                message:
                  "Job not found",
              })
          }

          // User cannot bid on
          // their own job
          if (
            job?.buyer?.email ===
            req.user.email
          ) {
            return res
              .status(400)
              .send({
                message:
                  "You cannot bid on your own job",
              })
          }

          // Duplicate bid check
          const query = {
            email:
              incomingBid.email,
            jobId:
              incomingBid.jobId,
          }

          const alreadyApplied =
            await bidsCollection.findOne(
              query
            )

          if (alreadyApplied) {
            return res
              .status(400)
              .send({
                message:
                  "You have already placed a bid on this job.",
              })
          }

          // Always create bid as Pending
          const bidData = {
            ...incomingBid,

            buyer_email:
              job.buyer.email,

            status: "Pending",
          }

          const result =
            await bidsCollection.insertOne(
              bidData
            )

          // Increase job bid count
          await jobsCollection.updateOne(
            {
              _id: new ObjectId(
                incomingBid.jobId
              ),
            },
            {
              $inc: {
                bid_count: 1,
              },
            }
          )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to create bid",
          })
        }
      }
    )

    // =====================================
    // Get My Bids
    // =====================================

    app.get(
      "/my-bids/:email",
      verifyToken,
      async (req, res) => {
        try {
          const tokenEmail =
            req.user.email

          const email =
            req.params.email

          if (tokenEmail !== email) {
            return res
              .status(403)
              .send({
                message:
                  "Forbidden access",
              })
          }

          const query = {
            email,
          }

          const result =
            await bidsCollection
              .find(query)
              .toArray()

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to get bids",
          })
        }
      }
    )

    // =====================================
    // Get Bid Requests
    // =====================================

    app.get(
      "/bid-requests/:email",
      verifyToken,
      async (req, res) => {
        try {
          const tokenEmail =
            req.user.email

          const email =
            req.params.email

          if (tokenEmail !== email) {
            return res
              .status(403)
              .send({
                message:
                  "Forbidden access",
              })
          }

          const query = {
            buyer_email: email,
          }

          const result =
            await bidsCollection
              .find(query)
              .toArray()

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to get bid requests",
          })
        }
      }
    )

    // =====================================
    // Update Bid Status
    // =====================================

    app.patch(
      "/bid/:id",
      verifyToken,
      async (req, res) => {
        try {
          const id = req.params.id
          const { status } =
            req.body

          const userEmail =
            req.user.email

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({
                message:
                  "Invalid bid ID",
              })
          }

          const allowedStatuses = [
            "In Progress",
            "Complete",
            "Rejected",
          ]

          if (
            !allowedStatuses.includes(
              status
            )
          ) {
            return res
              .status(400)
              .send({
                message:
                  "Invalid bid status",
              })
          }

          const bid =
            await bidsCollection.findOne({
              _id: new ObjectId(id),
            })

          if (!bid) {
            return res
              .status(404)
              .send({
                message:
                  "Bid not found",
              })
          }

          // =====================================
          // Job owner can Accept / Reject
          // =====================================

          if (
            status ===
              "In Progress" ||
            status === "Rejected"
          ) {
            if (
              bid.buyer_email !==
              userEmail
            ) {
              return res
                .status(403)
                .send({
                  message:
                    "Only the job owner can accept or reject this bid",
                })
            }

            if (
              bid.status !== "Pending"
            ) {
              return res
                .status(400)
                .send({
                  message:
                    "Only pending bids can be accepted or rejected",
                })
            }
          }

          // =====================================
          // Bidder can mark work Complete
          // =====================================

          if (
            status === "Complete"
          ) {
            if (
              bid.email !== userEmail
            ) {
              return res
                .status(403)
                .send({
                  message:
                    "Only the bidder can mark this work as complete",
                })
            }

            if (
              bid.status !==
              "In Progress"
            ) {
              return res
                .status(400)
                .send({
                  message:
                    "Only an in-progress bid can be completed",
                })
            }
          }

          const result =
            await bidsCollection.updateOne(
              {
                _id: new ObjectId(id),
              },
              {
                $set: {
                  status,
                },
              }
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              "Failed to update bid status",
          })
        }
      }
    )

    // =====================================
    // MongoDB Ping
    // =====================================

    await client
      .db("admin")
      .command({
        ping: 1,
      })

    console.log(
      "Pinged your deployment. MongoDB connected successfully!"
    )
  } catch (error) {
    console.error(
      "MongoDB connection error:",
      error
    )
  }
}

run().catch(console.dir)

// =====================================
// Home Route
// =====================================

app.get("/", (req, res) => {
  res.send(
    "Hello from JobNest Server...."
  )
})

// =====================================
// Start Server
// =====================================

app.listen(port, () => {
  console.log(
    `Server running on port ${port}`
  )
})