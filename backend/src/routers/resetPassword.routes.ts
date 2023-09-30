import express from 'express'
import { ResetPasswordController } from '../controllers/resetPassword.controller'


const resetPasswordRouter = express.Router()

resetPasswordRouter.route('/resetPassword').post(
    (req, res)=>new ResetPasswordController().resetPassword(req, res)
)

export default resetPasswordRouter