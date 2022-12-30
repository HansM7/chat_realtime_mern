import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes