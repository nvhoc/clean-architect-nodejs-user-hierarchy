import DatabasePd from '$provider/database'

export default class RolesGet {
  constructor() {
    this._model = DatabasePd.of().getModel('roles')
  }

  static of(data) {
    return new RolesGet(data)
  }

  async exec() {
    const user = await this._model.find({})
    return user
  }
}
