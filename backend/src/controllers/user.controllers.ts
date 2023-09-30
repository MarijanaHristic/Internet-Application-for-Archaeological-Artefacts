import express from 'express'
import UserModel from '../models/korisnik'
import RequestsModel from '../models/zahtev'
import ArtefactModel from '../models/artefakt'

export class UserController {
    changePassword = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let password = req.body.password

        RequestsModel.updateMany({ 'id': id }, { $set: { 'lozinka': password } }, (err, resp) => {
            if (err) console.log(err)
            else {
                UserModel.updateMany({ 'id': id }, { $set: { 'lozinka': password } }, (err, resp) => {
                    if (err) console.log(err)
                    else {
                        res.json({ 'message': "Successfull" })
                    }
                })
            }
        })
    }

    getAllArtefacts = (req: express.Request, res: express.Response) => {

        ArtefactModel.find({}, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    archaeologicalExcSiteSearch = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam

        ArtefactModel.find({ 'arheoloskiLokalitetIskopavanja': { $regex: searchParam } }, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    materialSearch = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam

        ArtefactModel.find({ 'materijal': { $regex: searchParam } }, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    museumSearch = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam

        ArtefactModel.find({ 'muzej': { $regex: searchParam } }, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    relativeDatingSearch = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam

        ArtefactModel.find({ 'relativnoDatovanje': { $regex: searchParam } }, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    contextSearch = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam

        ArtefactModel.find({ 'kontekst': { $regex: searchParam } }, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    search = (req: express.Request, res: express.Response) => {
        let searchWords = req.body.searchParam
        
        const regexExpressions = searchWords.map(word => ({
            'opisIspodSlike': { $regex: `${word}`, $options: 'i' }
        }));
        
        ArtefactModel.find({
            $and: regexExpressions
        }, (err, artefacts) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "An error occurred" });
            }
        
            res.json(artefacts);
        });
        
    
       
    }
    

}