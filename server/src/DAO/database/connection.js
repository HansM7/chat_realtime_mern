import mongoose from "mongoose"

export const instanceConnection= async()=>{
    const URL='mongodb://127.0.0.1:27017/login_app'
    let rta= mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

