import express from 'express'
import { INTERNAL } from '$const/routes'

import users from '../handler/users'
import roles from '../handler/roles'

const router = express.Router()
router.use((req, res, next) => {
  req._context.data.where = INTERNAL
  return next()
})
// list all internal routes
router.get('/', (req, res) => {
  return res.send('hello internal')
})

router.get('/roles', roles.get)
router.post('/roles/set-list', roles.setList)

router.get('/users', users.get)
router.post('/users/set-list', users.setList)
router.get('/users/:id/get-sub-ordinates', users.getSubOrdinates)

export default router
