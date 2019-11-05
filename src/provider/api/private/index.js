import express from 'express'
import { PRIVATE } from '$const/routes'

const router = express.Router()

router.use((req, res, next) => {
  // TODO: add more validate user function
  req._context.data.where = PRIVATE
  return next()
})

// list all private routes
router.get('/', (req, res) => {
  return res.send('hello private')
})
module.exports = router
