import express from 'express'
import { UserController } from '../controllers/user.controllers'

const userRouter = express.Router()

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route('/getAllArtefacts').get(
    (req, res)=>new UserController().getAllArtefacts(req, res)
)

userRouter.route('/archaeologicalExcSiteSearch').post(
    (req, res)=>new UserController().archaeologicalExcSiteSearch(req, res)
)

userRouter.route('/materialSearch').post(
    (req, res)=>new UserController().materialSearch(req, res)
)

userRouter.route('/museumSearch').post(
    (req, res)=>new UserController().museumSearch(req, res)
)

userRouter.route('/relativeDatingSearch').post(
    (req, res)=>new UserController().relativeDatingSearch(req, res)
)

userRouter.route('/contextSearch').post(
    (req, res)=>new UserController().contextSearch(req, res)
)

userRouter.route('/search').post(
    (req, res)=>new UserController().search(req, res)
)


export default userRouter