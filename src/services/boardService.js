/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
// noi xu ly logic,services luon có return
const createNew = async (data) => {
  try {
    const newData = {
      ...data,
      slug: slugify(data.title)
    }
    return newData
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
