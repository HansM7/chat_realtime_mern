import userService from "../services/user.service.js"
import 'dotenv/config'
const User=new userService()
import jwt from "jsonwebtoken"


export const getUsersController=async(req,res)=>{
    const authorization = req.get('authorization')
    if(authorization){
        let token=null
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7)
        }
        const tokenReplace= token.split('"').join('')
        const decodeToken = jwt.decode(tokenReplace, process.env.SECRET)

        if(!token){
            res.status(501).json({
                message: 'Invalid token'
            })
        }else{
            
            const users = await User.getUsers(decodeToken.userSet)
            res.json(users)
        }
    }
    
    
}

export const createUserController=async(req,res)=>{

    const data={
        username:req.body.username,
        password:req.password
    }
    
    const register = await User.createUser(data)
    
    if(register.status==='error'){
        res.status(501).json(register)
    }else{
        res.status(200).json(register)
    }
    
}

export const loginController = async(req,res)=>{
    try {
        const {username, password} = req.body
        const userSet= await User.getUserForUsername(username)

        const userToken ={userSet}
        const token = jwt.sign(userToken,process.env.SECRET)
        res.status(200).json({status:'success',token})
        
    } catch (error) {
        console.log(error)
    }
}

export const getUserController=async(req,res)=>{
    try {
        // Obviando validaciones
        const id=req.params.id
        const user = await User.getUserForId(id)
        res.status(200).json(user)
    } catch (error) {consolelog(error)}
}