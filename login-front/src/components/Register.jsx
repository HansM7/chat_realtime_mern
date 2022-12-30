import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../Utils/UserUtils'


function Register() {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    username:"",
    password:""
  })

  const [errorLogin, setErrorLogin] = useState(false)

  const handleChangeForm=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    if(user.username!=="" && user.password!==""){
      const resRegister= await axios.post(`${API}/create`,user)
      if(resRegister.data.status ==="success"){
        navigate('/login')
      }else{
        setErrorLogin(true)
      }
    }
    
  }

  return (
    <div className='col-md-6 ' style={{margin:'auto',marginTop:'50px'}}>
		  <h4>Registrarse</h4>

      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="form-outline mb-4">
          <input type="text" name='username' className="form-control" onChange={(e)=>{handleChangeForm(e)}} />
          <label className="form-label" >Username</label>
        </div>
        <div className="form-outline mb-4">
          <input type="password" name='password' className="form-control"  onChange={(e)=>{handleChangeForm(e)}}/>
          <label className="form-label" >Password</label>
        </div>
        
        <button type="submit" className="btn btn-success btn-block mb-4">Registrar usuario</button>
        <br />

        <Link className="btn btn-primary" to="/login"> Volver al inicio </Link>
      </form>
      {
        (errorLogin)?<ErrorMessage />:""
      }
    </div>
  )

}

function ErrorMessage(){
  return (
    <div className="row mt-4">
      <div className="col-md-12">
        <div className="alert alert-danger mb-4">
          <strong>Error</strong> El usuario ya existe / campos vacios
        </div>
      </div>
    </div>
  )
}

export default Register