import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
//khởi tạo database ban đầu null khi chưa connect
let trelloDatabaseInstance = null
//khởi tạo 1 đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // k cần cái này cũng connect được nhé
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
//kết nối tới db
export const CONNECT_DB = async () => {
  //kết nối tới mongodb atlas với uri đã khai báo mongoClientInstance
  await mongoClientInstance.connect()
  // khi kết nối thành công thì gắn ngược lại db
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
//khi connect database thành công thì mình export trelloDatabaseInstance để sử dụng nhiều nơi trong code
//chỉ gọi GET_DB khi kết nối database thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Vui lòng kết nối tới database !!!')
  return trelloDatabaseInstance
}
