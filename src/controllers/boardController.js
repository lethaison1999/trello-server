import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

/* 
- controller điều hướng sang services 

- route->validation->controller->(học qua error Handling) ->services->model
- req.query: v1/board?author=thaisondev&height=170 , querystring, tìm kiếm => ?
- req.params: v1/board/:id => v1/board/123 => id=123

*/
// next -> errorHandleMidleware->loi tap trung->server.js

const createNew = async (req, res, next) => {
  try {
    const createBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const updatedBoard = await boardService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails,
  update
}
