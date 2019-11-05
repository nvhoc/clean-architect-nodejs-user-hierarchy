import DatabasePd from '$provider/database'

export default class UsersGet {
  constructor() {
    this._model = DatabasePd.of().getModel('users')
  }

  static of(data) {
    return new UsersGet(data)
  }

  async exec() {
    const user = await this._model.find({})
    return user
  }
}
