import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

/* 
- controller điều hướng sang services 

- route->validation->controller->(học qua error Handling) ->services->model
- req.query: v1/card?author=thaisondev&height=170 , querystring, tìm kiếm => ?
- req.params: v1/card/:id => v1/card/123 => id=123

*/
// next -> errorHandleMidleware->loi tap trung->server.js

const createNew = async (req, res, next) => {
  try {
    const createcard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createcard)
  } catch (error) {
    next(error)
  }
}
// const getDetails = async (req, res, next) => {
//   try {
//     const cardId = req.params.id
//     const card = await cardService.getDetails(cardId)
//     res.status(StatusCodes.OK).json(card)
//   } catch (error) {
//     next(error)
//   }
// }

export const cardController = {
  createNew
}
