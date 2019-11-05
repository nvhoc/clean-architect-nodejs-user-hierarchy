import Schema from '$provider/schema'

class Role {
  constructor(data = {}) {
    this._data = data
  }

  static of(data) {
    return new Role(data)
  }
}

// using schema format from mongoose
Role.schema = new Schema(
  {
    name: String,
    parent: Number,
  },
  {
    isBase: true,
  },
)

module.exports = Role
