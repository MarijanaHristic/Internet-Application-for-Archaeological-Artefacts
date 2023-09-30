import mongoose from "mongoose";

const Schema = mongoose.Schema

let Artefact = new Schema({
    id:{
        type: Number
    },
    slika: {
        type: String
    },
    opisIspodSlike: {
        type: String
    },
    duzina: {
        type: Number
    },
    sirina: {
        type: Number
    },
    visina: {
        type: Number
    },
    precnik: {
        type: Number
    },
    debljina: {
        type: Number
    },
    tezina: {
        type: Number
    },
    opisArtefakta: {
        type: String
    },
    analogije: {
        type: String
    },
    materijal: {
        type: String
    },
    opisUzorka: {
        type: String
    },
    sirovina: {
        type: String
    },
    arheoloskiLokalitetIskopavanja: {
        type: String
    },
    muzej: {
        type: String
    },
    inventarskiBroj: {
        type: String
    },
    relativnoDatovanje: {
        type: String
    },
    apsolutnoDatovanje: {
        type: String
    },
    kontekst: {
        type: String
    },
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    z: {
        type: Number
    },
    XRF: {
        type: Array
    },
    XRD: {
        type: Array
    },
    XS: {
        type: Array
    },
    OSL: {
        type: Array
    },
    pdfs: {
        type: Array
    },
    links: {
        type: Array
    },
})

export default mongoose.model('ArtefactModel', Artefact, 'artefakti')