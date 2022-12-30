import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import UserContext from '../Context/User/UserContext'
import { useNavigate } from 'react-router-dom'



function ListFriends() {
	const navigate = useNavigate()

    const {users,getUsers,getUser} = useContext(UserContext)


    useEffect(() => {
        if(!localStorage.getItem(import.meta.env.VITE_SECRET_LOGIN)){

        }else{
            getUsers()
        }
    }, [])
    
    return (
        <>
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                <h5 className="font-weight-bold mb-3 text-center text-lg-start">Contactos</h5>
                <div className="card">
                    <div className="card-body">
                        <ul className="list-unstyled mb-0">

                            {
                                users.map(user =>(
                                    <li className="p-2 border-bottom"  key={user.id}>
                                        <a onClick={()=>{getUser(user.id)}}  className="d-flex justify-content-between" style={{textDecoration:'none'}}>
                                            <div className="d-flex flex-row">
                                                <img src='https://cdn-icons-png.flaticon.com/512/6322/6322885.png' alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                <div className="pt-1">
                                                    <p className="fw-bold mb-0">{user.username}</p>
                                                </div>
                                            </div>
                                            {/* <div className="pt-1">
                                                <p className="small text-muted mb-1">Just now</p>
                                                <span className="badge bg-danger float-end">1</span>
                                            </div> */}
                                        </a>
                                    </li>
                                ))
                            }
                            
                            

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListFriends