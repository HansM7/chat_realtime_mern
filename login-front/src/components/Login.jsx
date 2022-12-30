import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API from '../Utils/UserUtils'
function Login() {

	const navigate = useNavigate()

	const [user, setUser] = useState({
		username: '',
		password: ''
	})

	const handleChangeForm=(e)=>{
		setUser({...user,[e.target.name]:e.target.value})
	}

	const handleSubmit = async(e)=>{
		e.preventDefault()
		const responseLogin= await axios.post(`${API}/login`,user)
		if(responseLogin.data.status==='success'){
			window.localStorage.setItem(import.meta.env.VITE_SECRET_LOGIN,JSON.stringify(responseLogin.data.token))
			navigate('/home')
		}else{
			navigate('/login')
		}
	}
    
    return (
      <div className='col-md-6 ' style={{margin:'auto',marginTop:'50px'}}>
		<form onSubmit={(e)=>{handleSubmit(e)}}>
			<div className="form-outline mb-4">
				<input type="text" name='username' className="form-control" onChange={(e)=>{handleChangeForm(e)}} />
				<label className="form-label" >Email address</label>
			</div>

			<div className="form-outline mb-4">
				<input type="password" name='password' className="form-control"  onChange={(e)=>{handleChangeForm(e)}}/>
				<label className="form-label" >Password</label>
			</div>

			<button type="submit" className="btn btn-primary btn-block mb-4">Ingresar</button>
			
		</form>
      </div>
    )
}

export default Login