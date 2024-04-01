import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API V1 get.'
    })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({
      message: 'API V1 post.'
    })
  })

export const boardRoutes = Router
