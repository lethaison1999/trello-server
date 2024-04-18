/* eslint-disable no-useless-catch */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
// noi xu ly logic,services luon có return

const createNew = async (data) => {
  try {
    const newData = {
      ...data
    }
    const createColumn = await columnModel.createNew(newData)
    const getNewcolumn = await columnModel.findOneById(createColumn.insertedId)

    if (getNewcolumn) {
      getNewcolumn.cards = []
      // update columnOrderIds trong board
      await boardModel.pushColumnOrderIds(getNewcolumn)
    }

    return getNewcolumn
  } catch (error) {
    throw error
  }
}
const update = async (columnId, updateData) => {
  try {
    const newUpdateData = {
      ...updateData,
      updateAt: Date.now()
    }
    const update = await columnModel.update(columnId, newUpdateData)
    return update
  } catch (error) {
    throw error
  }
}
export const columnService = {
  createNew,
  update
}
