import React from 'react'
import { useNavigate } from 'react-router-dom'


function Logout() {

    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
        }
    };


    return (
        <div>Logout</div>
    )
}

export default Logout