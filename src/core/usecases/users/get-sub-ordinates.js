import DatabasePd from '$provider/database'
import RolesGetSubOrdinates from '../roles/get-sub-ordinates'

export default class UsersGetSubOrdinates {
  constructor(data = {}) {
    this._id = data.id
    this._model = DatabasePd.of().getModel('users')
  }

  static of(data) {
    return new UsersGetSubOrdinates(data)
  }

  async exec() {
    const user = await this._model.findById(this._id)
    const roles = await RolesGetSubOrdinates.of({ roleId: user.role }).exec()
    return this._model.findByRoles(roles)
  }
}
