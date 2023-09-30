import express from 'express'
import RequestsModel from '../models/zahtev'
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

export class RegisterController {
    register = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let id = req.body.id
        let institution = req.body.institution

        RequestsModel.insertMany([{
            'id': id,
            'ime': firstname, 'prezime': lastname, 'korisnicko_ime': username, 'lozinka': password,
            'email': email, 'tip': 'korisnik', 'status': 'zahtev', 'institucija': institution
        }])
        res.json({ 'message': "Zahtev za registracijom je poslat" })
    }

    getMaxId = (req: express.Request, res: express.Response) => {
        let maxId = 0
        RequestsModel.find({}, (err, requests) => {
            if (err) console.log(err)
            else {
                requests.forEach(element => {
                    if (maxId < element.id)
                        maxId = element.id
                });
            }
            maxId = maxId + 1
            res.json(maxId)
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email

        RequestsModel.findOne({'email': email, 'status': { $in: ["zahtev", "prihvacen"] }}, (err, user)=>{
            if(err) console.log(err) 
            else{
            if(user == null) res.json({'message': "Unique"})
            else res.json({'message': "Not unique"})
            }
        })
    }

    checkUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        RequestsModel.findOne({'korisnicko_ime': username, 'status': { $in: ["zahtev", "prihvacen"] }}, (err, user)=>{
            if(err) console.log(err)
            else{
            if(user == null) res.json({'message': "Unique"})
            else res.json({'message': "Not unique"})
            }
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