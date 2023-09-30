import mongoose from "mongoose";

const Schema = mongoose.Schema

let stringSchema = new Schema({
    value: {
        type: String
    }
  });
  
  export default mongoose.model('String', stringSchema);