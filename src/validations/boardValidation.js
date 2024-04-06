import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required ',
      'string.empty': 'Title is not  allowed  to be empty',
      'string.min': 'Titlelength must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal to 50 characters long',
      'string.trim': 'Title must not have leading of trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Description is required ',
      'string.empty': 'Description is not  allowed  to be empty',
      'string.min': 'Description length must be at least 3 characters long',
      'string.max': 'Description length must be less than or equal to 256 characters long',
      'string.trim': 'Description must not have leading of trailing whitespace'
    }),
    type: Joi.string()
      .valid(...Object.values(BOARD_TYPES))
      .required()
  })
  try {
    await conrrectCondition.validateAsync(req.body, { abortEarly: false })
    // validate success =>controller off midelware
    next()
  } catch (error) {
    //UNPROCESSABLE_ENTITY : 422
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const boardValidation = {
  createNew
}
