import bcrypt from "bcrypt"
import userService from "../../services/user.service.js"
const modelUser=new userService()

export const encryptPassword=async(req,res,next)=>{
    try {
        const passwordInitial=req.body.password
        const passHash = await bcrypt.hash(passwordInitial, 5)
        req.password=passHash
        next()
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res,next) =>{
    try {
        const {username, password} = req.body
        const user = await modelUser.getUserForUsername(username)
        if (user) {
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) res.satus(501).json({status:"error",message:"Error al iniciar sesion"})
                if(isMatch) next()
                else res.satus(501).json({status:"error",message:"Error al iniciar sesion"})
            })
        }else{
            res.json({status:"error",message:"el usuario no existe"})
        }
    } catch (error) {
        console.log(error)
    }
}