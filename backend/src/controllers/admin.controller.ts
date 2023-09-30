import express from 'express'
import UserModel from '../models/korisnik'
import RequestsModel from '../models/zahtev'
import ArtefactModel from '../models/artefakt'
import ValuesModel from '../models/vrednosti'

export class AdminController {

    
    insertNewVal = async (req: express.Request, res: express.Response) => {
        try {
            let category = req.body.category;
            let value = req.body.value;
    
            let updateQuery = {};
    
            switch (category) {
                case "Kontekst":
                    updateQuery = { $push: { konteksti: value } };
                    break;
                case "Materijal":
                    updateQuery = { $push: { materijali: value } };
                    break;
                case "Arheološki lok.iskopavanja":
                    updateQuery = { $push: { arhLokalitetiIskopavanja: value } };
                    break;
                case "Muzej":
                    updateQuery = { $push: { muzeji: value } };
                    break;
                case "Relativno datovanje":
                    updateQuery = { $push: { relDatovanja: value } };
                    break;
                default:
                    return res.status(400).json({ message: "Nepodržana kategorija." });
            }
    
            await ValuesModel.updateMany({}, updateQuery);
            res.json({ message: "Successfull" });
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ message: "Error" });
        }
    }
    

    getAllArtefacts = (req: express.Request, res: express.Response) => {

        ArtefactModel.find({}, (err, artefacts) => {
            if (err) console.log(err)
            else res.json(artefacts)
        })
    }

    getPredefiniedValuesObject = (req: express.Request, res: express.Response) => {

        ValuesModel.findOne({}, (err, obj) => {
            if (err) console.log(err)
            else res.json(obj)
        })
    }


    reguestsOnHold = (req: express.Request, res: express.Response) => {

        RequestsModel.find({ 'status': 'zahtev' }, (err, requests) => {
            if (err) console.log(err)
            else res.json(requests)
        })
    }

    denyRequest = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        RequestsModel.updateMany({ 'id': id }, { $set: { 'status': 'odbijen' } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': "Zahtev za registracijom odbijen" })
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let id = req.body.id


        RequestsModel.updateMany({ 'id': id }, { $set: { 'status': 'prihvacen' } }, (err, resp) => {
            if (err) console.log(err)
            else {
                RequestsModel.findOne({ 'id': id }, (err, request) => {
                    if (err) console.log(err)
                    else {
                        UserModel.insertMany([{
                            'id': id,
                            'ime': request.ime, 'prezime': request.prezime, 'korisnicko_ime': request.korisnicko_ime, 'lozinka': request.lozinka,
                            'email': request.email, 'tip': request.tip, 'status': 'prihvacen', 'institucija': request.institucija
                        }])
                    }
                })
                res.json({ 'message': "Zahtev za registracijom prihvacen" })
            }
        })
    }

    requestsAccepted = (req: express.Request, res: express.Response) => {

        RequestsModel.find({ 'status': 'prihvacen' }, (err, requests) => {
            if (err) console.log(err)
            else res.json(requests)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let id = req.body.id
        let type = req.body.type
        let institution = req.body.institution

        RequestsModel.insertMany([{
            'id': id,
            'ime': firstname, 'prezime': lastname, 'korisnicko_ime': username, 'lozinka': password,
            'email': email, 'tip': type, 'status': 'prihvacen', 'institucija': institution
        }])

        UserModel.insertMany([{
            'id': id,
            'ime': firstname, 'prezime': lastname, 'korisnicko_ime': username, 'lozinka': password,
            'email': email, 'tip': type, 'status': 'prihvacen', 'institucija': institution
        }])
        res.json({ 'message': "Novi clan je dodat" })
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

        RequestsModel.findOne({ 'email': email, 'status': { $in: ["zahtev", "prihvacen"] } }, (err, user) => {
            if (err) console.log(err)
            else {
                if (user == null) res.json({ 'message': "Unique" })
                else res.json({ 'message': "Not unique" })
            }
        })
    }

    checkUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        RequestsModel.findOne({ 'korisnicko_ime': username, 'status': { $in: ["zahtev", "prihvacen"] } }, (err, user) => {
            if (err) console.log(err)
            else {
                if (user == null) res.json({ 'message': "Unique" })
                else res.json({ 'message': "Not unique" })
            }
        })
    }

    getAllMembers = (req: express.Request, res: express.Response) => {

        UserModel.find({}, (err, members) => {
            if (err) console.log(err)
            else res.json(members)
        })
    }

    becomeAdmin = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        RequestsModel.updateMany({ 'id': id }, { $set: { 'tip': 'admin' } }, (err, resp) => {
            if (err) console.log(err)
            else {
                UserModel.updateMany({ 'id': id }, { $set: { 'tip': 'admin' } }, (err, resp) => {
                    if (err) console.log(err)
                    else {
                        res.json({ 'message': "Successfull" })
                    }
                })
            }
        })
    }

    becomeUser = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        RequestsModel.updateMany({ 'id': id }, { $set: { 'tip': 'korisnik' } }, (err, resp) => {
            if (err) console.log(err)
            else {
                UserModel.updateMany({ 'id': id }, { $set: { 'tip': 'korisnik' } }, (err, resp) => {
                    if (err) console.log(err)
                    else {
                        res.json({ 'message': "Successfull" })
                    }
                })
            }
        })
    }

    deleteMember = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        UserModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) console.log(err)
            else {
                RequestsModel.deleteOne({ 'id': id }, (err, resp) => {
                    if (err) console.log(err)
                    else {
                        res.json({ 'message': "Successfull" })
                    }
                })
            }
        })
    }

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

    addArtefact = (req: any, res: express.Response) => {
        console.log("usao")
        let pic = req.file
        let picture
        console.log(req.body.pdfs)
        if (pic == null) {
            picture = null
        } else { picture = req.file.filename }
        let id = req.body.id
        let pictureText = req.body.pictureText
        let length = req.body.length
        let width = req.body.width
        let height = req.body.height
        let diameter = req.body.diameter
        let thickness = req.body.thickness
        let weight = req.body.weight
        let descArtefact = req.body.descArtefact
        let analogies = req.body.analogies
        let material = req.body.material
        let descSample = req.body.descSample
        let rawMaterial = req.body.rawMaterial
        let archaeologicalExcSite = req.body.archaeologicalExcSite
        let museum = req.body.museum
        let invNumber = req.body.invNumber
        let relativeDating = req.body.relativeDating
        let absoluteDating = req.body.absoluteDating
        let context = req.body.context
        let x = req.body.x
        let y = req.body.y
        let z = req.body.z
        let pdfs = null
        let links = req.body.links
        const urls = JSON.parse(links)
        let xrf = []
        let xrd = []
        let xs = []
        let osl = []

        ArtefactModel.insertMany([{
            'id': id, 'slika': picture, 'opisIspodSlike': pictureText, 'duzina': length, 'sirina': width,
            'visina': height, 'precnik': diameter, 'debljina': thickness, 'tezina': weight, 'opisArtefakta': descArtefact,
            'analogije': analogies, 'materijal': material, 'opisUzorka': descSample, 'sirovina': rawMaterial,
            'arheoloskiLokalitetIskopavanja': archaeologicalExcSite, 'muzej': museum, 'inventarskiBroj': invNumber,
            'relativnoDatovanje': relativeDating, 'apsolutnoDatovanje': absoluteDating, 'kontekst': context,
            'x': x, 'y': y, 'z': z, 'pdfs': pdfs, 'links': urls, 'XRF': xrf, 'XRD': xrd,
            'XS': xs, 'OSL': osl
        }])

        res.json("Successfull")
    }

    putPdfs = (req: any, res: express.Response) => {
        let id = req.body.id
        let pdfFiles = req.files;
        console.log(pdfFiles)
        let pdfs = [];

        if (pdfFiles) {
            for (let i = 0; i < pdfFiles.length; i++) {
                console.log(pdfFiles[i].filename)
                pdfs.push(pdfFiles[i].filename);
            }

        }
        ArtefactModel.updateOne({ 'id': id }, { $set: { 'pdfs': pdfs } }, (err, resp) => {
            if (err) console.log(err)
            else res.json("Successfull")
        })
    }

    putPdfsEdit = (req: any, res: express.Response) => {
        let id = req.body.id
        let pdfFiles = req.files;
        let pdfFilesOld = JSON.parse(req.body.pdfFilesOld)
        console.log(pdfFiles)
        let pdfs = [];

        for (let i = 0; i < pdfFilesOld.length; i++) {
            pdfs.push(pdfFilesOld[i]);
        }

        if (pdfFiles) {
            for (let i = 0; i < pdfFiles.length; i++) {
                console.log(pdfFiles[i])
                pdfs.push(pdfFiles[i].filename);
            }
        }

        ArtefactModel.updateOne({ 'id': id }, { $set: { 'pdfs': pdfs } }, (err, resp) => {
            if (err) console.log(err)
            else res.json("Successfull")
        })
    }

    putXrfs = (req: any, res: express.Response) => {
        console.log("XRF")
        let id = req.body.id
        const mixedArrayJSON = req.body.mixedArray;
        const xrfPictures = JSON.parse(mixedArrayJSON);
        let files = req.files;
        let descs: String[] = JSON.parse(req.body.xrfDescs);
        let xrfArray = []

        if (xrfPictures || descs) {
            for (let i = 0, j = 0; i < xrfPictures.length || i < descs.length; i++) {
                let slika = null
                let opis = null
                if (xrfPictures) {
                    if (xrfPictures.length > i) {
                        if (xrfPictures[i] && xrfPictures[i] != "") {slika = files[j].filename
                        j++}
                    }
                }
                if (descs) {
                    if (descs.length > i) {
                        if (descs[i] && descs[i] != "") opis = descs[i]
                    }
                }
                let data = {
                    slika: slika,
                    tekst: opis
                }
                console.log(descs[i])
                xrfArray.push(data)
            }
        }
        console.log(xrfArray)
        ArtefactModel.updateOne({ 'id': id }, { $set: { 'XRF': xrfArray } }, (err, resp) => {
            if (err) console.log(err)
            else {
                res.json("Successfull")
            }
        })

    }

    putXrds = (req: any, res: express.Response) => {
        console.log("XRD")
        let id = req.body.id
        const mixedArrayJSON = req.body.mixedArray;
        const xrdPictures = JSON.parse(mixedArrayJSON);
        let files = req.files;
        let descs: String[] = JSON.parse(req.body.xrdDescs);
        let xrdArray = []

        if (xrdPictures || descs) {
            for (let i = 0, j = 0; i < xrdPictures.length || i < descs.length; i++) {
                let slika = null
                let opis = null
                if (xrdPictures) {
                    if (xrdPictures.length > i) {
                        if (xrdPictures[i] && xrdPictures[i] != "") {slika = files[j].filename
                            j++
                        }
                    }
                }
                if (descs) {
                    if (descs.length > i) {
                        if (descs[i] && descs[i] != "") opis = descs[i]
                    }
                }
                let data = {
                    slika: slika,
                    tekst: opis
                }
                console.log(descs[i])
                xrdArray.push(data)
            }
        }
        console.log(xrdArray)
        ArtefactModel.updateOne({ 'id': id }, { $set: { 'XRD': xrdArray } }, (err, resp) => {
            if (err) console.log(err)
            else {
                res.json("Successfull")
            }
        })

    }

    putXss = (req: any, res: express.Response) => {
        console.log("XS")
        let id = req.body.id
        const mixedArrayJSON = req.body.mixedArray;
        const xsPictures = JSON.parse(mixedArrayJSON);
        let files = req.files;
        let descs: String[] = JSON.parse(req.body.xsDescs);
        let xsArray = []

        if (xsPictures || descs) {
            for (let i = 0, j = 0; i < xsPictures.length || i < descs.length; i++) {
                let slika = null
                let opis = null
                if (xsPictures) {
                    if (xsPictures.length > i) {
                        if (xsPictures[i] && xsPictures[i] != "") {
                            slika = files[j].filename
                            j++
                        }
                    }
                }
                if (descs) {
                    if (descs.length > i) {
                        if (descs[i] && descs[i] != "") opis = descs[i]
                    }
                }
                let data = {
                    slika: slika,
                    tekst: opis
                }
                console.log(descs[i])
                xsArray.push(data)
            }
        }
        console.log(xsArray)
        ArtefactModel.updateOne({ 'id': id }, { $set: { 'XS': xsArray } }, (err, resp) => {
            if (err) console.log(err)
            else {
                res.json("Successfull")
            }
        })

    }

    putOsls = (req: any, res: express.Response) => {
        console.log("OSL")
        let id = req.body.id
        const mixedArrayJSON = req.body.mixedArray;
        const oslPictures = JSON.parse(mixedArrayJSON);
        let files = req.files;
        let descs: String[] = JSON.parse(req.body.oslDescs);
        let oslArray = []

        if (oslPictures || descs) {
            for (let i = 0, j = 0; i < oslPictures.length || i < descs.length; i++) {
                let slika = null
                let opis = null
                if (oslPictures) {
                    if (oslPictures.length > i) {
                        if (oslPictures[i] && oslPictures[i] != "") {slika = files[j].filename
                            j++
                        }
                    }
                }
                if (descs) {
                    if (descs.length > i) {
                        if (descs[i] && descs[i] != "") opis = descs[i]
                    }
                }
                let data = {
                    slika: slika,
                    tekst: opis
                }
                console.log(descs[i])
                oslArray.push(data)
            }
        }
        console.log(oslArray)
        ArtefactModel.updateOne({ 'id': id }, { $set: { 'OSL': oslArray } }, (err, resp) => {
            if (err) console.log(err)
            else {
                res.json("Successfull")
            }
        })

    }

    deleteArtefact = (req: any, res: express.Response) => {
        let id = req.body.id

        ArtefactModel.deleteMany({ 'id': id }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': "Artefact deleted" })
        })
    }

    getMaxIdOfArtefact = (req: express.Request, res: express.Response) => {
        let maxId = 0
        ArtefactModel.find({}, (err, aretfacts) => {
            if (err) console.log(err)
            else {
                aretfacts.forEach(element => {
                    if (maxId < element.id)
                        maxId = element.id
                });
            }
            maxId = maxId + 1
            res.json(maxId)
        })
    }


    getPic = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        ArtefactModel.find({ 'id': id }, (err, pic) => {
            if (err) console.log(err)
            else {
                res.json(pic)
            }
        })
    }

    update = (req: any, res: express.Response) => {
        let pic = req.file
        let picture
        if (pic == null) {
            picture = null
        } else { picture = req.file.filename }
        let id = req.body.id
        let pictureText = req.body.pictureText
        let length = req.body.length
        let width = req.body.width
        let height = req.body.height
        let diameter = req.body.diameter
        let thickness = req.body.thickness
        let weight = req.body.weight
        let descArtefact = req.body.descArtefact
        let analogies = req.body.analogies
        let material = req.body.material
        let descSample = req.body.descSample
        let rawMaterial = req.body.rawMaterial
        let archaeologicalExcSite = req.body.archaeologicalExcSite
        let museum = req.body.museum
        let invNumber = req.body.invNumber
        let relativeDating = req.body.relativeDating
        let absoluteDating = req.body.absoluteDating
        let context = req.body.context
        let x = req.body.x
        let y = req.body.y
        let z = req.body.z
        console.log(y)
        let links = req.body.links
        console.log(links)
        const urls = JSON.parse(links)

        if (picture) {
            ArtefactModel.updateOne({
                'id': id
            }, {
                $set: {
                    'opisIspodSlike': pictureText, 'slika': picture, 'duzina': length, 'sirina': width,
                    'visina': height, 'precnik': diameter, 'debljina': thickness, 'tezina': weight, 'opisArtefakta': descArtefact,
                    'analogije': analogies, 'materijal': material, 'opisUzorka': descSample, 'sirovina': rawMaterial,
                    'arheoloskiLokalitetIskopavanja': archaeologicalExcSite, 'muzej': museum, 'inventarskiBroj': invNumber,
                    'relativnoDatovanje': relativeDating, 'apsolutnoDatovanje': absoluteDating, 'kontekst': context,
                    'x': x, 'y': y, 'z': z, 'links': urls
                }
            }, (err, resp) => {
                if (err) console.log(err)
                else res.json("Successfull")
            })
        } else {
            ArtefactModel.updateOne({
                'id': id
            }, {
                $set: {
                    'opisIspodSlike': pictureText, 'duzina': length, 'sirina': width,
                    'visina': height, 'precnik': diameter, 'debljina': thickness, 'tezina': weight, 'opisArtefakta': descArtefact,
                    'analogije': analogies, 'materijal': material, 'opisUzorka': descSample, 'sirovina': rawMaterial,
                    'arheoloskiLokalitetIskopavanja': archaeologicalExcSite, 'muzej': museum, 'inventarskiBroj': invNumber,
                    'relativnoDatovanje': relativeDating, 'apsolutnoDatovanje': absoluteDating, 'kontekst': context,
                    'x': x, 'y': y, 'z': z, 'links': urls
                }
            }, (err, resp) => {
                if (err) console.log(err)
                else res.json("Successfull")
            })
        }
    }

}