import DatabasePd from '$provider/database'

export default class RolesSetList {
  constructor(data = {}) {
    this._list = data.list || []
    this._model = DatabasePd.of().getModel('roles')
  }

  static of(data) {
    return new RolesSetList(data)
  }

  async exec() {
    const roles = await this._model.insertMany(this._list)
    return roles
  }
}
