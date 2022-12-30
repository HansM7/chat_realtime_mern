
import ChatService from "../services/chat.service.js"
const Chat = new ChatService()

export const instanceSocket = (io) => {

    io.on('connection', (socket) => {

        // AL INGRESAR QUE SE CARGUEN TODOS LOS MENSAJES FETCH

        socket.emit("channel_general","Conexión exitosa")

        socket.on('get-messages',async(data)=>{
            const dataMessage = await Chat.getMessages(data)
            
            io.emit("return-messages",dataMessage)
        })

        socket.on('send-message',async(data)=>{
            const dataMessage = await Chat.registerMessage(data)
            
            io.emit("return-messages2",dataMessage)
        })

        // const applyMessage = async()=>{
        //     socket.emit("applyMessage", "Solicitando acceso")
        // }
        // applyMessage()




    })

}