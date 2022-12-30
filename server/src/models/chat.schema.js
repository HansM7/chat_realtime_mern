import mongoose from "mongoose"

export const chatSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    users:{
        type:Array
    },
    messages:{
        type:Array,
        required: true
    }
})