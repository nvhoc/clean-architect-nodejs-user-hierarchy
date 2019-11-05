import BaseModel from './base'
import Role from '$entities/role'

let ins = null

class RoleModel extends BaseModel {
  constructor(conn) {
    super(conn, 'roles', { schema: Role.schema })
  }

  static of(conn) {
    if (ins) {
      return ins
    }
    ins = new RoleModel(conn)
    return ins
  }

  async findSubOrdinates(roleId) {
    const self = this
    let theLastSubs = []
    const directSubs = await self._model.find({ parent: roleId })
    const requestGet = []
    for (let i = 0; i < directSubs.length; i = +1) {
      const r = directSubs[i]
      theLastSubs.push(r.id)
      requestGet.push(self.findSubOrdinates(r.id))
    }
    const childrenSubs = await Promise.all(requestGet)
    for (let i = 0; i < childrenSubs.length; i = +1) {
      const s = childrenSubs[i]
      theLastSubs = theLastSubs.concat(s)
    }
    return theLastSubs
  }
}

export default RoleModel
