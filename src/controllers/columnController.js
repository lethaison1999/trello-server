import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

/* 
- controller điều hướng sang services 

- route->validation->controller->(học qua error Handling) ->services->model
- req.query: v1/column?author=thaisondev&height=170 , querystring, tìm kiếm => ?
- req.params: v1/column/:id => v1/column/123 => id=123

*/
// next -> errorHandleMidleware->loi tap trung->server.js

const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const updatedBoard = await columnService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  update
}
