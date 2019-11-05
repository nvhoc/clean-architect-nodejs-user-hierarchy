import DatabasePd from '$provider/database'

export default class RolesCreate {
  constructor(data = {}) {
    const { name, parent } = data
    this._params = { name, parent }
    this._model = DatabasePd.of().getModel('roles')
  }

  static of(data) {
    return new RolesCreate(data)
  }

  async exec() {
    const roles = await this._model.create(this._params)
    return roles
  }
}
