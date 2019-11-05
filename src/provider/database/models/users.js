import BaseModel from './base'
import User from '$entities/user'

let ins = null

class UserModel extends BaseModel {
  constructor(conn) {
    super(conn, 'users', { schema: User.schema })
  }

  static of(conn) {
    if (ins) {
      return ins
    }
    ins = new UserModel(conn)
    return ins
  }

  findByRoles(roles) {
    return this.find({ role: { $in: roles } })
  }

  findById(id) {
    return this.findOne({ id })
  }
}

export default UserModel
