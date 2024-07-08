import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";


export class CatsController extends BaseController {
  constructor() {
    super('api/felines')
    // this.router.get('/friends', () => console.log('🐈🐈🐈'))
    this.router.get('/friends', this.getCatFriends) // first example with local data in service
    this.router.post('', this.createCatFriend)
    this.router.get('', this.getCatsFromDb)
    this.router.delete('/:catId', this.deleteCat)
  }

  getCatFriends(request, response, next) {
    // console.log('request', request);
    // console.log('responese', response);
    console.log('🐈🐈🐈')
    const cats = catsService.getCatFriends()
    response.send(cats)
  }

  async getCatsFromDb(request, response, next) {
    try {
      const cats = await catsService.getCatsFromDb()
      response.send(cats)
    } catch (error) {
      next(error)
    }
  }

  async createCatFriend(request, response, next) {
    try {
      const catData = request.body
      console.log('creating Cat', catData);
      const cat = await catsService.createCatFriend(catData)
      console.log('created Cat', cat);
      response.statusCode = 201 // incase we want to change the status code on the response
      response.send(cat)
    } catch (error) {
      next(error) // kick them back to the hall way, and let the response pipeline send them back automatically
    }
  }

  async deleteCat(request, response, next) {
    try {
      console.log(request);
      const idToRemove = request.params.catId
      console.log('💣🐈', idToRemove);
      const message = await catsService.deleteCat(idToRemove)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
