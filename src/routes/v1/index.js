import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoutes'
const Router = express.Router()

// Check api v1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API V1 are ready to use.'
  })
})
// API Broads
Router.use('/broads', boardRoutes)
export const APIs_V1 = Router
