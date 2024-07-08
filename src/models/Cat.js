import { Schema } from "mongoose";



export const CatSchema = new Schema({
  // name: String,
  // picture: String,
  // age: Number possible but not good options
  name: { type: String, maxLength: 25, required: true },
  picture: { type: String, maxLength: 25, required: true, default: '🐆' },
  age: { type: Number, max: 31, min: 0, required: false },
  favoriteActivities: [{ type: String, maxLength: 25 }]
})
