import Schema from '$provider/schema'

class User {
  constructor(data = {}) {
    this._data = data
  }

  static of(data) {
    return new User(data)
  }
}

// using schema format from mongoose
User.schema = new Schema(
  {
    name: String,
    role: Number,
  },
  {
    isBase: true,
  },
)

module.exports = User
