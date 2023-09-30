import express from 'express'
import { RegisterController } from '../controllers/register.controller'

const registerRouter = express.Router()

registerRouter.route('/register').post(
    (req, res)=>new RegisterController().register(req, res)
)

registerRouter.route('/getMaxId').get(
    (req, res)=>new RegisterController().getMaxId(req, res)
)

registerRouter.route('/checkUsername').post(
    (req, res)=>new RegisterController().checkUsername(req, res)
)

registerRouter.route('/checkEmail').post(
    (req, res)=>new RegisterController().checkEmail(req, res)
)

registerRouter.route('/resetPassword').post(
    (req, res)=>new RegisterController().resetPassword(req, res)
)

export default registerRouter