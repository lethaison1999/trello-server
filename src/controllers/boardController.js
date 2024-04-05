import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
// import ApiError from '~/utils/ApiError'
/* 
- controller điều hướng sang services 

- route->validation->controller->(học qua error Handling) ->services->model
- req.query: v1/board?author=thaisondev&height=170 , querystring, tìm kiếm => ?
- req.params: v1/board/:id => v1/board/123 => id=123

*/

const createNew = async (req, res, next) => {
  try {
    const createBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    // next -> errorHandleMidleware->loi tap trung->server.js
    next(error)
  }
}

export const boardController = {
  createNew
}
