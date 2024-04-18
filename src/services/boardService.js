/* eslint-disable no-useless-catch */
import { cloneDeep } from 'lodash'
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

// noi xu ly logic,services luon có return

const createNew = async (data) => {
  try {
    const newData = {
      ...data,
      slug: slugify(data.title)
    }
    const createBoard = await boardModel.createNew(newData)
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    const resBoard = cloneDeep(board)

    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}
const update = async (boardId, updateData) => {
  try {
    const newUpdateData = {
      ...updateData,
      updateAt: Date.now()
    }
    const update = await boardModel.update(boardId, newUpdateData)
    return update
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew,
  getDetails,
  update
}
