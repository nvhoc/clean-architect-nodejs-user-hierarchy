import { Schema } from 'mongoose'
import _ from 'lodash/core'

// We can replace Schame provider with interface using in entities
class MySchema extends Schema {
  constructor(schema, opts = {}) {
    let newSchema = schema
    if (opts.isBase) {
      newSchema = _.extend(
        {
          id: { type: Number, default: 0 },
        },
        schema,
      )
    }
    super(newSchema, opts)
    this._schema = newSchema
    this._schemaKeys = Object.keys(newSchema)
  }
}

export default MySchema
