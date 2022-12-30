import React, { useEffect, useRef, useState } from 'react'
import UserState from '../Context/User/UserState'
import Chat from './Chat'
import ListFriends from './ListFriends'
import { useNavigate } from 'react-router-dom'

import { io } from 'socket.io-client'
import API from '../Utils/UserUtils'


function Home() {
	
	const navigate = useNavigate()

	const socket = useRef()



	useEffect( () => {
		if (!localStorage.getItem(import.meta.env.VITE_SECRET_LOGIN)) {
		  navigate("/login");
		} 
	  }, []);

	useEffect(() => {
		if (!localStorage.getItem(import.meta.env.VITE_SECRET_LOGIN)) {
			navigate("/login");
		}
		socket.current = io(API);
		socket.current.on("channel_general", (data) => {
			console.log(data)
		});
	}, [])


	const handleLogout = ()=>{
		localStorage.clear();
        navigate("/login");
	}
	
	
  return (
    <UserState>
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid">
				<p><h5>Bienvenido {selected}</h5></p>
				<a onClick={handleLogout} className='btn btn-outline-secondary'>Salir</a>
			</div>
		</nav>

		<section style={{backgroundColor:'#eee',height:'auto',minHeight:'100vh'}}>
			<div className="container py-5">
				<div className="row">
					<ListFriends/>
					<Chat socket={socket} />
				</div>
			</div>
		</section>
    </UserState>
  )
}

export default Home