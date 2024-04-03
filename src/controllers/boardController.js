import { StatusCodes } from 'http-status-codes'
// import ApiError from '~/utils/ApiError'
/* 
- route->validation->controller->(học qua error Handling) ->services->model
- controller điều hướng sang services 
- req.query: v1/board?author=thaisondev&height=170 , querystring, tìm kiếm => ?
- req.params: v1/board/:id => v1/board/123 => id=123
*/

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)
    // res.status(StatusCodes.CREATED).json({
    //   message: 'POST from validation api create broad'
    // })
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'thaisondev test error')
    res.status(StatusCodes.CREATED).json({
      message: 'POST from validation api create broad'
    })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
