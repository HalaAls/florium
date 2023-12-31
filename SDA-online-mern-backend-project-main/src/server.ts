//server.ts
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'

import { dev } from './config'
import authRouter from './routers/authRoute'
import categoryRouter from './routers/categoryRoute'
import ordersRouter from './routers/ordersRoute'
import productsRouter from './routers/productsRoute'
import usersRouter from './routers/usersRoute'

// import apiErrorHandler from './middlewares/errorHandler'
import { errorHandler } from './middlewares/errorHandler'
import myLogger from './middlewares/logger'

import { connectDB } from './config/db'
import { createHttpError } from './errors/createHttpError'

const app: Application = express()
const PORT: number = dev.app.port

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use('/public', express.static('public'))
app.use(myLogger)
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log('Server running http://localhost:' + PORT)
  connectDB()
})

// Client error
app.use((req, res, next) => {
  const error = createHttpError(404, 'Route not found')
  next(error)
})

// It have to be at the bottom of all routes so they can reach to it
app.use(errorHandler)
