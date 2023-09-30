import express from 'express'
import UserModel from '../models/korisnik'
import RequestModel from '../models/zahtev'

export class ResetPasswordController {
    resetPassword = (req: express.Request, res: express.Response) => {
        let email = req.body.email
        let password = req.body.password

        UserModel.updateMany({ 'email': email }, { $set: { 'lozinka': password } }, (err, resp) => {
            if (err) console.log(err)
            else {
                RequestModel.updateMany({ 'email': email }, { $set: { 'lozinka': password } }, (err, resp) => {
                    if(err) console.log(err)
                    else res.json({"message": 'Successfull'})
                })
            }
        })
    }

}