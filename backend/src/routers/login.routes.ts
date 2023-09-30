import express from 'express'
import { LoginController } from '../controllers/login.controller'

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const loginRouter = express.Router()

loginRouter.route('/login').post(
    (req, res)=>new LoginController().login(req, res)
)

loginRouter.route('/resetPassword').post(
    (req, res)=>new LoginController().resetPassword(req, res)
)

export default loginRouter