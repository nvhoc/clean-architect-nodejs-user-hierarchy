import DatabasePd from '$provider/database'

export default class UsersDelete {
  constructor(data = {}) {
    this._query = data.query
    this._model = DatabasePd.of().getModel('users')
  }

  static of(data) {
    return new UsersDelete(data)
  }

  async exec() {
    const user = await this._model.remove(this._query)
    return user
  }
}
