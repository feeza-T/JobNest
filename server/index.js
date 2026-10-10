import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} from 'mongodb'

dotenv.config()

const app = express()
const port = process.env.PORT || 9000

// =====================================
// Middleware
// =====================================

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://jobnest.web.app',
  ],
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
      message: 'Unauthorized access',
    })
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log('JWT Error:', err)

        return res.status(401).send({
          message: 'Unauthorized access',
        })
      }

      console.log('Decoded JWT:', decoded)

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
    // Connect MongoDB
    await client.connect()

    console.log('Connected to MongoDB!')

    // Collections
    const jobsCollection = client
  .db('jobnest')
  .collection('jobs')

const bidsCollection = client
  .db('jobnest')
  .collection('bids')
    // =====================================
    // Generate JWT
    // =====================================

    app.post('/jwt', async (req, res) => {
      const user = req.body

      const token = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '365d',
        }
      )

      res
        .cookie('token', token, {
          httpOnly: true,

          secure:
            process.env.NODE_ENV === 'production',

          sameSite:
            process.env.NODE_ENV === 'production'
              ? 'none'
              : 'lax',
        })
        .send({
          success: true,
        })
    })

    // =====================================
    // Logout
    // =====================================

    app.get('/logout', (req, res) => {
      res
        .clearCookie('token', {
          httpOnly: true,

          secure:
            process.env.NODE_ENV === 'production',

          sameSite:
            process.env.NODE_ENV === 'production'
              ? 'none'
              : 'lax',
        })
        .send({
          success: true,
        })
    })

    // =====================================
    // Get All Jobs
    // =====================================

    app.get('/jobs', async (req, res) => {
      try {
        const result = await jobsCollection
          .find()
          .toArray()

        res.send(result)
      } catch (error) {
        console.log(error)

        res.status(500).send({
          message: 'Failed to get jobs',
        })
      }
    })

    // =====================================
    // Get Jobs For Pagination
    // =====================================

    app.get('/all-jobs', async (req, res) => {
      try {
        const size =
          parseInt(req.query.size) || 6

        const page =
          parseInt(req.query.page) || 1

        const filter =
          req.query.filter || ''

        const sort =
          req.query.sort || ''

        const search =
          req.query.search || ''

        // Search query
        const query = {
          job_title: {
            $regex: search,
            $options: 'i',
          },
        }

        // Category filter
        if (filter) {
          query.category = filter
        }

        // Sort
        const sortOptions = {}

        if (sort === 'asc') {
          sortOptions.deadline = 1
        }

        if (sort === 'desc') {
          sortOptions.deadline = -1
        }

        let cursor = jobsCollection.find(query)

        if (sort) {
          cursor = cursor.sort(sortOptions)
        }

        const result = await cursor
          .skip((page - 1) * size)
          .limit(size)
          .toArray()

        res.send(result)
      } catch (error) {
        console.log(error)

        res.status(500).send({
          message: 'Failed to load jobs',
        })
      }
    })

    // =====================================
    // Get Jobs Count
    // =====================================

    app.get('/jobs-count', async (req, res) => {
      try {
        const filter =
          req.query.filter || ''

        const search =
          req.query.search || ''

        const query = {
          job_title: {
            $regex: search,
            $options: 'i',
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
          message: 'Failed to count jobs',
        })
      }
    })

    // =====================================
    // Get Single Job
    // =====================================

    app.get('/job/:id', async (req, res) => {
      try {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
          return res.status(400).send({
            message: 'Invalid job ID',
          })
        }

        const query = {
          _id: new ObjectId(id),
        }

        const result =
          await jobsCollection.findOne(query)

        res.send(result)
      } catch (error) {
        console.log(error)

        res.status(500).send({
          message: 'Failed to get job',
        })
      }
    })

    // =====================================
    // Save Job
    // =====================================

    app.post(
      '/job',
      verifyToken,
      async (req, res) => {
        try {
          const jobData = req.body

          console.log(
            'Job Data:',
            jobData
          )

          const result =
            await jobsCollection.insertOne(
              jobData
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message: 'Failed to create job',
          })
        }
      }
    )

    // =====================================
    // Get Jobs Posted By User
    // =====================================

    app.get(
      '/jobs/:email',
      verifyToken,
      async (req, res) => {
        try {
          const tokenEmail =
            req.user.email

          const email =
            req.params.email

          console.log(
            'Token Email:',
            tokenEmail
          )

          console.log(
            'Requested Email:',
            email
          )

          // Security check
          if (tokenEmail !== email) {
            return res
              .status(403)
              .send({
                message:
                  'Forbidden access',
              })
          }

          const query = {
            'buyer.email': email,
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
              'Failed to get posted jobs',
          })
        }
      }
    )

    // =====================================
    // Delete Job
    // =====================================

    app.delete(
      '/job/:id',
      verifyToken,
      async (req, res) => {
        try {
          const id = req.params.id

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({
                message:
                  'Invalid job ID',
              })
          }

          const query = {
            _id: new ObjectId(id),
          }

          const result =
            await jobsCollection.deleteOne(
              query
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message: 'Failed to delete job',
          })
        }
      }
    )

    // =====================================
    // Update Job
    // =====================================

    app.put(
      '/job/:id',
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
                  'Invalid job ID',
              })
          }

          const query = {
            _id: new ObjectId(id),
          }

          const updateDoc = {
            $set: {
              ...jobData,
            },
          }

          const result =
            await jobsCollection.updateOne(
              query,
              updateDoc
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message: 'Failed to update job',
          })
        }
      }
    )

    // =====================================
    // Save Bid
    // =====================================

    app.post(
      '/bid',
      verifyToken,
      async (req, res) => {
        try {
          const bidData = req.body

          // Prevent user from bidding
          // using another email
          if (
            req.user.email !==
            bidData.email
          ) {
            return res
              .status(403)
              .send({
                message:
                  'Forbidden access',
              })
          }

          // Check duplicate bid
          const query = {
            email: bidData.email,
            jobId: bidData.jobId,
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
                  'You have already placed a bid on this job.',
              })
          }

          // Insert bid
          const result =
            await bidsCollection.insertOne(
              bidData
            )

          // Increase job bid count
          if (
            ObjectId.isValid(
              bidData.jobId
            )
          ) {
            await jobsCollection.updateOne(
              {
                _id: new ObjectId(
                  bidData.jobId
                ),
              },
              {
                $inc: {
                  bid_count: 1,
                },
              }
            )
          }

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message: 'Failed to create bid',
          })
        }
      }
    )

    // =====================================
    // Get My Bids
    // =====================================

    app.get(
      '/my-bids/:email',
      verifyToken,
      async (req, res) => {
        try {
          const tokenEmail =
            req.user.email

          const email =
            req.params.email

          // Security check
          if (tokenEmail !== email) {
            return res
              .status(403)
              .send({
                message:
                  'Forbidden access',
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
            message: 'Failed to get bids',
          })
        }
      }
    )

    // =====================================
    // Get Bid Requests
    // =====================================

    app.get(
      '/bid-requests/:email',
      verifyToken,
      async (req, res) => {
        try {
          const tokenEmail =
            req.user.email

          const email =
            req.params.email

          // Security check
          if (tokenEmail !== email) {
            return res
              .status(403)
              .send({
                message:
                  'Forbidden access',
              })
          }

          /*
            IMPORTANT:

            If your bid object looks like:

            {
              buyer_email: "abc@gmail.com"
            }

            use:
              { buyer_email: email }

            If your bid object looks like:

            {
              buyer: {
                email: "abc@gmail.com"
              }
            }

            use:
              { "buyer.email": email }
          */

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
              'Failed to get bid requests',
          })
        }
      }
    )

    // =====================================
    // Update Bid Status
    // =====================================

    app.patch(
      '/bid/:id',
      verifyToken,
      async (req, res) => {
        try {
          const id = req.params.id
          const status = req.body

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({
                message:
                  'Invalid bid ID',
              })
          }

          const query = {
            _id: new ObjectId(id),
          }

          const updateDoc = {
            $set: status,
          }

          const result =
            await bidsCollection.updateOne(
              query,
              updateDoc
            )

          res.send(result)
        } catch (error) {
          console.log(error)

          res.status(500).send({
            message:
              'Failed to update bid status',
          })
        }
      }
    )

    // =====================================
    // MongoDB Ping
    // =====================================

    await client
      .db('admin')
      .command({
        ping: 1,
      })

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } catch (error) {
    console.error(
      'MongoDB connection error:',
      error
    )
  }
}

run().catch(console.dir)

// =====================================
// Home Route
// =====================================

app.get('/', (req, res) => {
  res.send(
    'Hello from JobNest Server....'
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