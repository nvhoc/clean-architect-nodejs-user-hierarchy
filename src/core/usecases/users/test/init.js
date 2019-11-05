import UsersSetList from '../set-list'
import UsersDelete from '../delete'
import RolesSetList from '../../roles/set-list'
import RolesDelete from '../../roles/delete'

const users = [
  {
    id: 1,
    name: 'Adam Admin',
    role: 1,
  },
  {
    id: 2,
    name: 'Emily Employee',
    role: 4,
  },
  {
    id: 3,
    name: 'Sam Supervisor',
    role: 3,
  },
  {
    id: 4,
    name: 'Mary Manager',
    role: 2,
  },
  {
    id: 5,
    name: 'Steve Trainer',
    role: 5,
  },
]

const roles = [
  {
    id: 1,
    name: 'System Administrator',
    parent: 0,
  },
  {
    id: 2,
    name: 'Location Manager',
    parent: 1,
  },
  {
    id: 3,
    name: 'Supervisor',
    parent: 2,
  },
  {
    id: 4,
    name: 'Employee',
    parent: 3,
  },
  {
    id: 5,
    name: 'Trainer',
    parent: 3,
  },
]
export const initializeUsers = () => {
  return UsersSetList.of({ list: users }).exec()
}
export const initializeRoles = () => {
  return RolesSetList.of({ list: roles }).exec()
}

export const clearUsers = () => {
  return UsersDelete.of({ list: users }).exec()
}
export const clearRoles = () => {
  return RolesDelete.of({ list: roles }).exec()
}
