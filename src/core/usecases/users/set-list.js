import DatabasePd from '$provider/database'

export default class UsersSetList {
  constructor(data = {}) {
    this._list = data.list || []
    this._model = DatabasePd.of().getModel('users')
  }

  static of(data) {
    return new UsersSetList(data)
  }

  async exec() {
    const user = await this._model.insertMany(this._list)
    return user
  }
}
