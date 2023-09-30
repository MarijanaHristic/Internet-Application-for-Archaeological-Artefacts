import mongoose from "mongoose";

const Schema = mongoose.Schema

let Request = new Schema({
    id:{
        type: Number
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String
    },
    institucija: {
        type: String
    }
})

export default mongoose.model('RequestModel', Request, 'zahtevi')