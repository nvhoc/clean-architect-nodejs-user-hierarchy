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

  async findSubOrdinatesV1(roleId) {
    const self = this
    let theLastSubs = []
    const directSubs = await self._model.find({ parent: roleId })
    const requestGet = []
    for (let i = 0; i < directSubs.length; i += 1) {
      const r = directSubs[i]
      theLastSubs.push(r.id)
      requestGet.push(self.findSubOrdinatesV1(r.id))
    }
    const childrenSubs = await Promise.all(requestGet)
    for (let i = 0; i < childrenSubs.length; i += 1) {
      const s = childrenSubs[i]
      theLastSubs = theLastSubs.concat(s)
    }
    return theLastSubs
  }

  async findSubOrdinates(roleId) {
    const roles = await this._model.find({})
    const roleTree = {}
    for (let i = 0; i < roles.length; i += 1) {
      const r = roles[i]
      const { id, parent } = r
      if (!roleTree[parent]) {
        roleTree[parent] = { id: parent, children: [] }
      }
      if (!roleTree[id]) {
        roleTree[id] = { id, parent, children: [] }
      }
      let ptrParent = roleTree[parent]
      while (ptrParent) {
        ptrParent.children.push(id)
        ptrParent = roleTree[ptrParent.parent]
      }
    }
    return (roleTree[roleId] && roleTree[roleId].children) || []
  }
}

export default RoleModel
