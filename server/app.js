import "dotenv/config"
import express from 'express'
import cors from "cors"
import routerUser from "./src/routes/user.routes.js"
import routerChat from "./src/routes/chat.routes.js"
import {Server} from 'socket.io'
import { instanceSocket } from "./src/socket/index.js"

const app=express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/',routerUser)
app.use('/',routerChat)


const server=app.listen(process.env.PORT)
// const io=new Server(server)

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

const io = new Server(server, { cors: { origin: '*' } });
instanceSocket(io)