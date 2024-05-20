const express = require('express')

const helmet = require('helmet')

const morgan = require('morgan')

const dotenv = require('dotenv')

const connectDatabase = require('../database/database')

const cors = require('cors')

dotenv.config()

const app = express()

// MIDDLEWARES
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

app.use(cors())

const PORT = process.env.PORT || 5000

// ROUTE IMPORTS

const AuthenticationRoute = require('../routes/AuthenticationRoute')
const PaymentsRoutes = require('../routes/PaymentsRoutes')

const UsersRoutes = require('../routes/UsersRoutes')


const BooksRoute = require("../routes/BooksRoute")


app.use('/api/auth', AuthenticationRoute)
app.use('/api/payment', PaymentsRoutes)
app.use('/api/users', UsersRoutes)
app.use('/api/books', BooksRoute)



const connectServer = async () => {
  await connectDatabase()

  app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`)
  })
}

connectServer()
