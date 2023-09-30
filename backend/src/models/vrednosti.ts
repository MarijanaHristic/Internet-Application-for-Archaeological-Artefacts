import mongoose from "mongoose";

const Schema = mongoose.Schema

let Value = new Schema({
    materijali:{
        type: Array
    },
    relDatovanja:{
        type: Array
    },
    muzeji:{
        type: Array
    },
    arhLokalitetiIskopavanja:{
        type: Array
    },
    konteksti:{
        type: Array
    }
})

export default mongoose.model('ValuesModel', Value, 'vrednosti')
