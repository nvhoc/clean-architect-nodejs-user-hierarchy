import DatabasePd from '$provider/database'

export default class UsersCreate {
  constructor(data = {}) {
    const { name, role } = data
    this._params = { name, role }
    this._model = DatabasePd.of().getModel('users')
  }

  static of(data) {
    return new UsersCreate(data)
  }

  async exec() {
    const user = await this._model.create(this._params)
    return user
  }
}
