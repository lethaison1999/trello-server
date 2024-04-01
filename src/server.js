/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Thai Son Dev!</h1><hr>')
  })

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
