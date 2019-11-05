import UsersGet from '$usecases/users/get'
import UsersSetList from '$usecases/users/set-list'
import UsersGetSubOrdinates from '$usecases/users/get-sub-ordinates'

export default {
  async get(req, res, next) {
    try {
      const users = await UsersGet.of(req._context.data).exec()
      return res.json(users)
    } catch (err) {
      return next(err)
    }
  },
  async setList(req, res, next) {
    try {
      const users = await UsersSetList.of(req._context.data).exec()
      return res.json(users)
    } catch (err) {
      return next(err)
    }
  },
  async getSubOrdinates(req, res, next) {
    try {
      const users = await UsersGetSubOrdinates.of(req.params).exec()
      return res.json(users)
    } catch (err) {
      return next(err)
    }
  },
}
