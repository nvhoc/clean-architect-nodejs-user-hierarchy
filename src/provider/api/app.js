import express from 'express'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import extend from 'lodash/extend'

import DatabaseConnection from '$provider/database'
import logger from '$logger'

import publicRoutes from './public'
import privateRoutes from './private'
import internalRoutes from './internal'

DatabaseConnection.of()
const app = express()

// enable security, CORS, compression and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// error handling
// have to specify 4 args to identify error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error('log', err.stack)
  res.status(500).json({
    msg: err.message || err.reason,
  })
})

app.use((req, res, next) => {
  req._context = {
    data: extend({}, req.query, req.body),
    header: req.header,
  }
  next()
})

// router
app.use('/api/v1/public', publicRoutes)
app.use('/api/v1/private', privateRoutes)
app.use('/api/v1/internal', internalRoutes)

export default app
