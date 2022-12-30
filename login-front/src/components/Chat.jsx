import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/User/UserContext'
import { io } from 'socket.io-client'
import axios from 'axios'
import API from '../Utils/UserUtils'

function Chat({socket}) {

	const {selectedUser} = useContext(UserContext)

	const [dataChat, setDataChat] = useState([])
	const [message, setMessage] = useState("")
	
	const [dataChat2, setDataChat2] = useState([])


	useEffect(() => {
		socket.current = io(API)
		socket.current.on("return-messages", (data) => {
			if(data.messages){
				setDataChat([data.messages])
			}else{
				setDataChat([])
			}
		})
	}, [])

	useEffect(() => {
		socket.current = io(API)
		socket.current.on("return-messages2", (data) => {
			setDataChat([data.dataMessage.messages])
		})
	}, [])
	
	

	useEffect(() => {
		if(selectedUser){
			const token = localStorage.getItem(import.meta.env.VITE_SECRET_LOGIN)
			const data={
				token,
				selectedUser
			}
			socket.current = io(API)
			socket.current.emit('get-messages',data)
		}
		
	}, [selectedUser])
	
	
	const handleChangeMessage=(e)=>{
		setMessage(e.target.value)
	}

	const handleSendMessage=async()=>{
		const token = localStorage.getItem(import.meta.env.VITE_SECRET_LOGIN)
		socket.current = io(API)
		const data = {
			token,
			selectedUser,
			message
		}
		socket.current.emit('send-message',data)
		setMessage("")
	}

	// console.log(dataChat)
	// console.log(dataChat)

	return (
		<div className="col-md-6 col-lg-7 col-xl-8">
			{
				selectedUser?(
					
					<ul className="list-unstyled">
						<div className="navbar bg-body-tertiary p-3 mb-2">
							<p>Chat con el usuario <span className='text-primary '>{selectedUser.username}</span></p>
						</div>

						{
							dataChat.map((item)=>(
								item.map((data,key)=>(
									(data.user.id===selectedUser.id)?(<MessageSend key={key} data={data}/>):(<MessageRecep key={key} data={data}/>)
								))
							))

						}
						<li className="bg-white mb-3" style={{borderRadius:'5'}}>
							<div className="form-outline" >
								<textarea value={message} onChange={(e)=>{handleChangeMessage(e)}} className="form-control" id="textAreaExample2" rows="4" placeholder='Escribe un mensaje'></textarea>
							</div>
						</li>
						<button onClick={handleSendMessage} type="button" className="btn btn-info btn-rounded float-end">Send</button>
					</ul>
				):<ChatEmpty/>
			}
			
		
		</div>
	)
}

function MessageSend({data}){
	return(
		<li className="d-flex justify-content-between mb-4" >
			<img src="https://cdn-icons-png.flaticon.com/512/6322/6322885.png" alt="avatar"
				className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
			<div className="card" style={{width:'100%'}}>
				<div className="card-header d-flex justify-content-between p-3">
					<p className="fw-bold mb-0">{data.user.username}</p>
				</div>
				<div className="card-body">
					<p className="mb-0">
						{data.message}
					</p>
				</div>
			</div>
		</li>
	)
	
}
function MessageRecep({data}){
	return(
		<li className="d-flex justify-content-between mb-4">
			
			<div className="card" style={{width:'100%'}}>
				<div className="card-header d-flex justify-content-between p-3">
					<p className="fw-bold mb-0">{data.user.username}</p>
				</div>
				<div className="card-body">
					<p className="mb-0">
						{data.message}
					</p>
				</div>
			</div>
			<img src="https://cdn-icons-png.flaticon.com/512/6322/6322885.png" alt="avatar"
				className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
		</li>
	)
	
}

function ChatEmpty(){
	return(
		<div>
			Seleccione un chat
		</div>
	)
}

export default Chat