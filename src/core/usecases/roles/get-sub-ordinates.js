import DatabasePd from '$provider/database'

export default class RolesGetSubOrdinates {
  constructor(data = {}) {
    this._roleId = data.roleId
    this._model = DatabasePd.of().getModel('roles')
  }

  static of(data) {
    return new RolesGetSubOrdinates(data)
  }

  async exec() {
    return this._model.findSubOrdinates(this._roleId)
  }
}
