import UsersGetSubOrdinates from '../get-sub-ordinates'
import {
  initializeUsers,
  initializeRoles,
  clearUsers,
  clearRoles,
} from './init'

import DatabaseConnection from '$provider/database'

beforeAll(() => {
  DatabaseConnection.of()
  return Promise.all([initializeUsers(), initializeRoles()])
})

afterAll(async () => {
  await Promise.all([clearUsers(), clearRoles()])
  DatabaseConnection.of().close()
})

test('getSubOrdinates user has role 3 (Supervisor) ', async () => {
  const users = await UsersGetSubOrdinates.of({ id: 3 }).exec()
  expect(users.map(i => i.id).sort()).toEqual([2, 5])
})

test('getSubOrdinates user has role 1 (System Administrator)', async () => {
  const users = await UsersGetSubOrdinates.of({ id: 1 }).exec()
  expect(users.map(i => i.id).sort()).toEqual([2, 3, 4, 5])
})
