class BaseModel {
  constructor(conn, name, opts = {}) {
    const { schema } = opts
    this._model = conn.model(name, schema)
    this._name = name
    this._opts = opts
  }

  findOne(...args) {
    return this._model.findOne(...args).exec()
  }

  find(...args) {
    return this._model.find(...args).exec()
  }

  async create(data, ...args) {
    const newData = data
    const entityByMaxId = await this._model
      .findOne()
      .sort({ id: -1 })
      .limit(1)
    const maxId = (entityByMaxId && entityByMaxId.id) || 0
    newData.id = maxId + 1
    return this._model.create(newData, ...args)
  }

  update(...args) {
    return this._model.update(...args)
  }

  remove(...args) {
    return this._model.remove(...args)
  }

  insertMany(...args) {
    return this._model.insertMany(...args)
  }
}

export default BaseModel
