import './footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerContainer">
                <div className="copyright">Copyright © Onchain Surveys 2022</div>
                <div className="socialIcons">
                    <ul>
                        <li><FontAwesomeIcon icon={faTwitter} /></li> 
                        <li><FontAwesomeIcon icon={faFacebook} /></li>  
                        <li><FontAwesomeIcon icon={faLinkedin} /></li>  
                    </ul>

                </div>
            </div>

        </div>
    )
}

export default Footer;