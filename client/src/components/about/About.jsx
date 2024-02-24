
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext, logout } from "../../context/AuthContext";

const About = () => {
    const { user, dispatch } = useContext(AuthContext)


    return (
        <div className="main">
            <div className="mainContainer"> 
                <div className="aboutRightMain">

                </div>
            </div>

            <div id="about" className="AboutUs">
                <div className="AboutUsContainer">
                    <h1>About Us</h1>
                    <p><b>Onchain Surveys</b> will allow users to create public surveys to collect opinions from the blockchain communities to let the community make decisions and provide sentiment in a decentralized manner.</p>
                </div>

            </div>
        </div>
    )
}

export default About;