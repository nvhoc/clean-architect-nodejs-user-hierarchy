import express from 'express'
import { PUBLIC } from '$const/routes'

const router = express.Router()

router.use((req, res, next) => {
  req._context.data.where = PUBLIC
  return next()
})

// list all public routes
router.get('/', (req, res) => {
  return res.send('hello public')
})
module.exports = router
