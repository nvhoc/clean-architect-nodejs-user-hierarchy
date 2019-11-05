import RolesGet from '$usecases/roles/get'
import RolesCreate from '$usecases/roles/create'
import RolesSetList from '$usecases/roles/set-list'

export default {
  async get(req, res, next) {
    try {
      const roles = await RolesGet.of(req._context.data).exec()
      return res.json(roles)
    } catch (err) {
      return next(err)
    }
  },
  async create(req, res, next) {
    try {
      const roles = await RolesCreate.of(req._context.data).exec()
      return res.json(roles)
    } catch (err) {
      return next(err)
    }
  },
  async setList(req, res, next) {
    try {
      const roles = await RolesSetList.of(req._context.data).exec()
      return res.json(roles)
    } catch (err) {
      return next(err)
    }
  },
}
