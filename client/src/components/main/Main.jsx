import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext, logout } from "../../context/AuthContext";

const Main = () => {
    const { user, dispatch } = useContext(AuthContext)


    return (
        <div className="main">
            <div className="mainContainer">
                <div className="leftMain">
                    <h1>Onchain Surveys will allow users.</h1>
                    <p>Onchain Surveys will allow users to create public surveys to collect opinions from the blockchain communities to let the community make.</p>

                    {user ? <button className="mainButton"><Link to="/surveys/new">Create Survey</Link></button> : <><button className="mainButton"><Link to="/login">Create Survey</Link></button></>}


                </div>

                <div className="rightMain">

                </div>
            </div>

            <div id="about" className="AboutUs">
                <div className="AboutUsContainer">
                    <h1>About Us</h1>
                    <p><b>Onchain Surveys</b> will allow users to create public surveys to collect opinions from the <span className="underLine">blockchain communities</span> to let the community make decisions and provide sentiment in a decentralized manner.</p>

                    <p><Link to="/about">More ></Link></p>
                </div>

            </div>
        </div>
    )
}

export default Main;