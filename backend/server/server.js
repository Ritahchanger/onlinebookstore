const express = require('express')

const helmet = require('helmet')

const morgan = require('morgan')

const dotenv = require('dotenv')

const connectDatabase = require('../database/database')

const cors = require('cors')

const cookieParser = require("cookie-parser")


dotenv.config()

const app = express()

// MIDDLEWARES
app.use(helmet())


app.use(express.json())


app.use(morgan('combined'))

app.use('/uploads',express.static('uploads'))


app.use(cors(
  {
    credentials:true,
    origin: 'http://localhost:3000'
  }
))

const PORT = process.env.PORT || 5000


// ROUTE IMPORTS



const AuthenticationRoute = require('../routes/AuthenticationRoute')



const PaymentsRoutes = require('../routes/PaymentsRoutes')



const UsersRoutes = require('../routes/UsersRoutes')


const BooksRoute = require("../routes/BooksRoute")


const BooksCategoriesRoutes = require("../routes/BooksCategoriesRoutes")

const BlogRoutes = require("../routes/BlogRoutes")




app.use('/api/auth', AuthenticationRoute)
app.use('/api/payment', PaymentsRoutes)
app.use('/api/users', UsersRoutes)
app.use('/api/books', BooksRoute)
app.use('/api/categories', BooksCategoriesRoutes)
app.use('/api/blog',BlogRoutes)



const connectServer = async () => {const BlogRoutes = require("../routes/BlogRoutes")

  await connectDatabase()

  app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`)
  })
}

connectServer()
