import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
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
const update = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict()
  })
  try {
    await conrrectCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    // validate success =>controller off midelware
    next()
  } catch (error) {
    //UNPROCESSABLE_ENTITY : 422
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const columnValidation = {
  createNew,
  update
}
