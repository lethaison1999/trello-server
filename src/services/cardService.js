/* eslint-disable no-useless-catch */
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
// noi xu ly logic,services luon có return

const createNew = async (data) => {
  try {
    const newData = {
      ...data
    }
    const createCard = await cardModel.createNew(newData)
    const getNewcard = await cardModel.findOneById(createCard.insertedId)
    if (getNewcard) {
      // update cardOrderIds trong column
      await columnModel.pushCardOrderIds(getNewcard)
    }
    return getNewcard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
