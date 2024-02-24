import axios from "axios";
import './login.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../navbars/Navbar";
import Footer from "../footer/Footer";
import { useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";



const Login = () => {

    const user = useContext(AuthContext);
    const navigation = useNavigate();


    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined
    });

    const { loading, error, dispatch} = useContext(AuthContext);
     
    useEffect(() => {
        if (user.user === null){
            
        } else {
            navigation("/")
        } 
    },[])
     
    const handleChange = (e) => {
        setCredentials( prev => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try{ 
            const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
            navigation("/")
        } catch(err) {
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
    }

   // console.log(user)

    return (
        <>
        <Navbar />
        <div className="login">
            <div className="loginContainer">
                <h1>Login</h1>
                {error && <span className="errorMessage">{error.message}</span>}
                <input 
                className="loginInput" 
                placeholder="Enter your username" 
                id="username" 
                onChange={handleChange} 
                type="text"/>

                <input 
                className="loginInput" 
                placeholder="Enter your password" 
                id="password" 
                onChange={handleChange} 
                type="password"/>   

                <button onClick={handleClick} id="loginButton" className="loginButtonRed" disabled={loading}>Login</button>

                <span className="anAccount" > <Link to="../register"> Need an a account? </Link></span>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Login;