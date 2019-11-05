import RolesGet from '$usecases/roles/get'
import RolesSetList from '$usecases/roles/set-list'

export default {
  async get(req, res, next) {
    try {
      const users = await RolesGet.of(req._context.data).exec()
      return res.json(users)
    } catch (err) {
      return next(err)
    }
  },
  async setList(req, res, next) {
    try {
      const users = await RolesSetList.of(req._context.data).exec()
      return res.json(users)
    } catch (err) {
      return next(err)
    }
  },
}
