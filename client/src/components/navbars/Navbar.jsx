import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { AuthContext, logout } from "../../context/AuthContext";
import { Link, useNavigate, NavLink } from "react-router-dom";


const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext)
  
    const navigation = useNavigate();

    const handleClick = (e) =>  { 
        
        localStorage.clear();
        navigation("/");
        window.location.reload();
          
    }
    

    return (

         
        <div className="Navbar">   
            {
                user ?
                
                    <>
                        <div className="navbarDiv fsd">
                            <Link to="/"><a className="logo">Onchain<span className="logoThin">Surveys</span></a></Link> 
                            <input className="menu-btn" type="checkbox" id="menu-btn" />
                            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                            <ul className="menu">
                                <li><NavLink to="/">Home </NavLink></li>
                                <li><Link to="/about">About</Link> </li>
                                <li><Link to="#">Surveys</Link>
                                    <div className="subMenu"> 
                                        <li><NavLink to="/surveys" >All Surveys</NavLink></li>
                                        <li><Link to="/surveys/opened" >Open Surveys</Link></li>
                                        <li><Link to="/surveys/new" >Create Survey</Link></li> 
                                    </div>
                                </li>
                                <li><Link to="#">Profile</Link>
                                    <div className="subMenu">  
                                        <li><Link to={`/user/${user._id}`} >{ user.username }</Link></li>
                                        <li><Link to="/surveys/mysurveys">My Surveys</Link></li>
                                        <li><Link to="/surveys/surveyhistory">Survey History</Link></li> 
                                      {user.isAdmin === 1 ? <li><Link to="/surveys/pending">Pending Surveys</Link></li> : ''}  
                                    </div> 
                                </li>
                                <li style={{cursor:"pointer"}} onClick={handleClick}> <div> <a>Logout</a></div></li>
                          
                            </ul>
                        </div>
                    </> 
                    : 
                    <>
                        <div className="navbarDiv fsd">
                            <a className="logo">Onchain<span className="logoThin">Surveys</span></a>
                            <input className="menu-btn" type="checkbox" id="menu-btn" />
                            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                            <ul className="menu">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link> </li>
                                <li><Link to="#careers">Surveys</Link>
                                    <div className="subMenu">
                                        <li><Link to="/surveys" >All Surveys</Link></li>
                                        <li><Link to="/surveys/opened" >Open Surveys</Link></li>
                                        <li><Link to="/login" >Create Survey</Link></li>
                                    </div>
                                </li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                        </div>
                    </>
            }

            { /*<div className="navItems">  user ? 
                    <> 
                    <div className="userInfo">{user.username} </div>  
                    <div className="logout">logout </div> </>

                    <li onClick={() => dispatch(logout())}><Link>Logout</Link></li>
                    :  
                    <>  
                     
                        <button className="navButton"><FontAwesomeIcon icon={faWallet} /> Connect Wallet</button>
                        <Link style={{color:'white'}} to="/login" className="navButton"><FontAwesomeIcon icon={faUserTie} /> Login</Link>
                 
                    </>
               </div> */ }


        </div>
    )
}

export default Navbar;