import express from 'express'
import UserModel from '../models/korisnik'

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "marijanahristic12@gmail.com",
        pass: "hhsmvwmitxtruaul"
    }
});


export class LoginController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let password = req.body.password

        UserModel.findOne({ 'korisnicko_ime': username, 'lozinka': password }, (err, user) => {
            if (err) console.log(err)
            else res.json(user)
        })
    }

    resetPassword = async (req: express.Request, res: express.Response) => {

            const email = req.body.email;

            // Pronalaženje korisnika prema e-mailu
            const user = await UserModel.findOne({ 'email': email });

            if (!user) {
                console.log("!usergreska");
                return res.json({ message: 'Korisnik sa ovim e-mailom ne postoji.' });
            }

            // Generisanje tokena za resetovanje lozinke
            const resetToken = jwt.sign({ email }, 'resetSecret', { expiresIn: '10m' });

            // Slanje e-maila sa linkom za resetovanje
            const mailOptions = {
                to: email,
                subject: 'Resetovanje lozinke',
                html: `<p>Kliknite na ovaj <a href="http://localhost:4200/resetPassword/${resetToken}">link</a> za resetovanje lozinke.</p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.json({ message: 'Greška prilikom slanja e-maila.' });
                } else {
                    console.log('E-pošta poslata:', info.response);
                    res.json({ message: 'E-mail sa linkom za resetovanje lozinke poslat.' });
                }
            });
        }

}