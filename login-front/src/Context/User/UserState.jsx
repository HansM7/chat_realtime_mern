import React, { useReducer } from 'react'
import API from '../../Utils/UserUtils'
import axios from 'axios'
import UserReducer from './UserReducer'
import UserContext from './UserContext'


function UserState(props) {

    const initialState={
        users:[],
        selectedUser:null
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUsers=async()=>{
        const token = localStorage.getItem(import.meta.env.VITE_SECRET_LOGIN)
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
        };
        const res = await axios.get(`${API}/users`,{headers: headers})
        dispatch({
            type:'GET_USERS',
            payload: res.data
        })
    }

    const getUser = async(id)=>{
        const res = await axios.get(`${API}/user/${id}`)
        dispatch({
            type:'GET_USER',
            payload: res.data
        })
    }

    return (
        <UserContext.Provider value={{
            users:state.users,
            selectedUser:state.selectedUser,
            getUsers,
            getUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState