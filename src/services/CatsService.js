import { dbContext } from "../db/DbContext.js"

const Dbcats = [
  {
    name: 'Carl',
    picture: '🐈'
  },
  {
    name: 'Wall-e',
    picture: '🐈‍⬛'
  },
  {
    name: 'Lightning McQueen',
    picture: '🐅'
  },
  {
    name: 'Woody Pride',
    picture: '🐆'
  }
]

class CatsService {

  // NOTE example with data from array above
  getCatFriends() {
    const cats = Dbcats
    return cats
  }
  // NOTE example getting data from database
  async getCatsFromDb() {
    const cats = await dbContext.Cats.find() // in this case, the Mongoose find, finds ALL, where typically JS find on gets one
    return cats
  }
  async createCatFriend(catData) {
    const cat = await dbContext.Cats.create(catData)
    return cat
  }

  async deleteCat(idToRemove) {
    // await dbContext.Cats.findByIdAndDelete(idToRemove) works, but doesn't give us context around the delete
    const catToRemove = await dbContext.Cats.findById(idToRemove)
    console.log('gotcha!', catToRemove);

    if (catToRemove === null) throw new Error(`No cat with the id: ${idToRemove}`)

    await catToRemove.deleteOne()
    return `deleted ${catToRemove.name}`
  }

}

export const catsService = new CatsService()
