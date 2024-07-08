import mongoose from 'mongoose'
import { CatSchema } from '../models/Cat.js'

class DbContext {
  Cats = mongoose.model('Cat', CatSchema)
}

export const dbContext = new DbContext()
