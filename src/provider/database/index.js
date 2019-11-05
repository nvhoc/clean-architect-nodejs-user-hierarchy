import mongoose from 'mongoose'
import Models from './models'
import logger from '$logger'
import config from '$config'

let ins = null

class DatabaseConnection {
  constructor() {
    const conn = mongoose.createConnection(
      config.get('mongo.uri', process.env.MONGO_URL),
      {
        socketTimeoutMS: 30000,
        keepAlive: true,
        reconnectTries: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    conn.catch(err => {
      logger.error('db error ', err)
    })
    conn.once('open', () => {
      logger.info('db connection is opening')
    })
    conn.on('close', () => {
      logger.info('db connection closed')
    })
    conn.on('connected', () => {
      logger.info('db was connected')
    })
    conn.on('disconnected', () => {
      logger.error('db was disconnected')
    })
    this._conn = conn
  }

  static of() {
    if (ins) return ins
    ins = new DatabaseConnection()
    return ins
  }

  getModel(name) {
    return Models[name].of(this._conn)
  }
}

export default DatabaseConnection
