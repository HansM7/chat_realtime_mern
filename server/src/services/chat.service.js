import {instanceConnection} from '../DAO/database/connection.js'
import mongoose from 'mongoose'
import { chatSchema } from '../models/chat.schema.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const schema=mongoose.model('chat', chatSchema)

export default class ChatService{

    async createId(){
        const data = await schema.find()
        const dataLength = data.length
        const newID= dataLength +1
        return newID

    }

    async registerMessage(data){
        try {
            // Verificar si el chat ya existe

            const authorization = data.token
            let tokenReplace= authorization.split('"').join('')

            const decodeToken = jwt.decode(tokenReplace, process.env.SECRET)

            const newData={
                user_emisor:decodeToken.userSet,
                user_receptor:data.selectedUser,
                message:data.message
            }

            const responseVerify=await this.verifyMessage(newData)

            const idChat=responseVerify.idChat

            if(responseVerify.status){
                const messageBody={
                    user:decodeToken.userSet,
                    message:data.message
                }
                await schema.updateOne({'id':idChat},{$addToSet:{"messages":messageBody}})
                const dataChatRes = await schema.findOne({'id':idChat})
                return {
                    dataMessage:dataChatRes
                }
            }else{
                const users=[decodeToken.userSet,data.selectedUser]

                if(data.message.length>0){
                    const messages=[
                        {
                            user:decodeToken.userSet,
                            message:data.message
                        }
                    ]
                    const id=await this.createId()
                    const dataSet={
                        'id':parseInt(id),
                        'users': users,
                        'messages':messages
                    }
                    await schema.create(dataSet)
                    const dataChatRes = await schema.findOne({'id':id})
                    return {
                        dataMessage:dataChatRes
                    }
                }
            }
            

        } catch (error) {console.log(error)}
    }

    async getIdChatIfExists(datachat,data) {
        try {
            await instanceConnection()

            const {user_emisor,user_receptor}=data
            
            let idChatPermanence=null

            datachat.map((item)=>{
                
                let users=item.users

                let coincidence=0

                users.map((user)=>{

                    if(user.username===user_emisor.username || user.username===user_receptor.username){
                        coincidence+=1
                    }
                })

                if(coincidence===2){
                    idChatPermanence=item.id
                }

            })

            return idChatPermanence


        } catch (error) {console.log(error)}
    }

    async verifyMessage(data){
        try {
            await instanceConnection()

            const datachat = await schema.find()

            const idChat=await this.getIdChatIfExists(datachat,data)

            if(idChat!==null){
                return {
                    status:true,
                    idChat
                }
            }else{
                return {
                    status:false
                }
            }

        } catch (error) {console.log(error)}
    }

    async getMessages(data){
        try {
            await instanceConnection()

            const authorization = data.token
            let tokenReplace= authorization.split('"').join('')

            const decodeToken = jwt.decode(tokenReplace, process.env.SECRET)

            const datachat = await schema.find()

            const user={
                user_emisor:decodeToken.userSet,
                user_receptor:data.selectedUser
            }

            const idChat=await this.getIdChatIfExists(datachat,user)

            if(idChat!==null){
                const dataMessage = await schema.findOne({'id':idChat})
                // console.log("===================================")
                // console.log(dataMessage)
                return dataMessage
            }else{
                return {}
            }
            

        } catch (error) {console.log(error)}
    }

}