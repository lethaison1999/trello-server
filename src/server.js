/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // json body data
  app.use(express.json())

  //use APIs v1
  app.use('/v1', APIs_V1)

  //middleware xử lý lỗi chung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, Server is running on https://${env.APP_HOST}:${env.APP_PORT}`
    )
  })
  exitHook(() => {
    CLOSE_DB()
  })
}
//IIFE anymount async func
;(async () => {
  try {
    console.log('1. Đang kết nối để cơ sở dữ liệu...')
    await CONNECT_DB()
    console.log('2. Kết nối tới database thành công !!!')

    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
// chỉ khi kết nối tới database thành công thì mới start server
// CONNECT_DB()
//   .then(() => console.log('Kết nối tới database thành công !!!'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error)
//     process.exit(0)
//   })
