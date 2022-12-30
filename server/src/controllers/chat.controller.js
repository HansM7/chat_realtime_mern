import ChatService from "../services/chat.service.js"
import jwt from 'jsonwebtoken'
import userService from "../services/user.service.js"
const User = new userService()
const Chat = new ChatService()

export const registerMessage = async(req,res)=>{

    const authorization = req.get('authorization')
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

        const user_e = await User.getUserForUsername(decodeToken.userSet.username)
        const user_r = await User.getUserForUsername(req.body.user.username)
        
        const data={
            user_emisor: user_e,
            user_receptor:user_r,
            message:req.body.message
        }

        const responseRegister = await Chat.registerMessage(data)
        res.status(200).json(responseRegister)
    }
}


export const getMessagesController=async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.getUserForUsername(username)

        const authorization = req.get('authorization')
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
    
            const user_e = await User.getUserForUsername(decodeToken.userSet.username)
            const user_r = user
            
            const data={
                user_emisor: user_e,
                user_receptor:user_r
            }
    
            const responseChat = await Chat.getMessages(data)
            res.status(200).json(responseChat)
        }

    } catch (error) {console.log(error)}
}