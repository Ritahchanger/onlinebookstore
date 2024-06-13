const express = require('express')

const helmet = require('helmet')

const morgan = require('morgan')

const dotenv = require('dotenv')

const connectDatabase = require('../database/database')

const cors = require('cors')

const cookieParser = require('cookie-parser')


dotenv.config()

const app = express()

// MIDDLEWARES
app.use(helmet())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true })) // To parse URL-encoded bodies

app.use(express.json())

app.use(morgan('combined'))

app.use(
  '/upload/books',
  express.static('upload/books', {
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);



app.use(
  '/upload/authors',
  express.static('upload/authors', {
    setHeaders: res => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    }
  })
)


app.use(
  '/upload/blogs',
  express.static('upload/blogs', {
    setHeaders: res => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    }
  })
)




app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5000']
  })
)

const PORT = process.env.PORT || 5000

// ROUTE IMPORTS

const AuthenticationRoute = require('../routes/AuthenticationRoute')

const PaymentsRoutes = require('../routes/PaymentsRoutes')

const UsersRoutes = require('../routes/UsersRoutes')

const BooksRoute = require('../routes/BooksRoute')

const BooksCategoriesRoutes = require('../routes/BooksCategoriesRoutes')

const BlogRoutes = require('../routes/BlogRoutes')

const AuthorRoutes = require('../routes/AuthorsRoutes')

const CartRoute = require('../routes/CartRoute')

const PayPalRoute = require('../routes/PayPalRoute');

const TestimonialRoute = require('../routes/TestmonialRoute')




app.use('/api/auth', AuthenticationRoute);
app.use('/api/payment', PaymentsRoutes);
app.use('/api/payment/paypal',PayPalRoute);
app.use('/api/users', UsersRoutes);
app.use('/api/books', BooksRoute);
app.use('/api/categories', BooksCategoriesRoutes);
app.use('/api/blog', BlogRoutes);
app.use('/api/author', AuthorRoutes);
app.use('/api/testmonials',TestimonialRoute);

app.use('/api/cart', CartRoute)

const connectServer = async () => {
  const BlogRoutes = require('../routes/BlogRoutes')

  await connectDatabase()

  app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`)
  })
}

connectServer()
