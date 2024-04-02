import { StatusCodes } from 'http-status-codes'

/* 
- route->validation->controller->services->model
- controller điều hướng sang services 
- req.query: v1/board?author=thaisondev&height=170 , querystring, tìm kiếm => ?
- req.params: v1/board/:id => v1/board/123 => id=123
*/

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'POST from validation api create broad'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}
