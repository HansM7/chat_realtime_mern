import {instanceConnection} from '../DAO/database/connection.js'
import {userSchema} from "../models/user.schema.js"
import mongoose from 'mongoose'

const schema=mongoose.model('user', userSchema)

export default class userService{

    async createID(){
        try {
            await instanceConnection()
            const allUsers=await schema.find({})
            const userLength = allUsers.length
            const newID= userLength +1
            return newID
        } catch (error) {
            console.log(error)
        }
        
    }


    async getUserForUsername(username){
        try {
            await instanceConnection()
            const user = await schema.findOne({username})
            return user            
        } catch (error) {
            console.log(error)
        }
    }

    async getUserForId(id){
        try {
            await instanceConnection()
            const user = await schema.findOne({'id':id})
            return user            
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(user){
        try {
            await instanceConnection()
            const users = await schema.find({ "username": { "$ne": user.username } })
            return users    
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(user){
        try {
            await instanceConnection()

            const responseExist = await this.isExist(user)

            if(responseExist.status==="error"){
                return responseExist
            }else{
                const id = await this.createID()

                user['id']=id

                await schema.create(user)

                return {
                    status:"success",
                    message:"Registro correcto"
                }
            }
            

            
        } catch (error) {
            console.log(error)            
        }
    }

    async isExist(data){
        try {
            await instanceConnection()
            const user = await schema.findOne({'username':data.username})
            if(user){
                return{
                    status:'error',
                    message:'Este usuario ya existe'
                }
            }else{
                return{
                    status:'success',
                    message:'Registro correcto'
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

}
