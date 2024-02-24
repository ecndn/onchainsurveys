import React from "react"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong} from "@fortawesome/free-solid-svg-icons"; 

function Sidebar(props) {

 
    return (
        <>
            {props.username === null ?
                <>
                    <div className="sidebar">
                        <h2>Welcome</h2>
                        <ul>
                            <li><FontAwesomeIcon icon={faRightLong} /><Link to="/surveys"> All Surveys</Link></li>
                            <li><FontAwesomeIcon icon={faRightLong} /><Link to="/surveys/opened"> Open Surveys</Link></li>
                            <li><FontAwesomeIcon icon={faRightLong} /><Link to="/login"> Create Survey</Link></li>
                            <li><FontAwesomeIcon icon={faRightLong} /><Link to="/register"> Register</Link></li>
                        </ul>
                    </div>
                </>
                :
                <>
                    <div className="sidebar">
                    <h2>Welcome {props.username}</h2>
                        <ul>
                        <li><FontAwesomeIcon icon={faRightLong} /><Link to={`/user/${props._id}`}> My Profile</Link></li>
                             <li><FontAwesomeIcon icon={faRightLong} /><Link to="/surveys/opened"> Open Surveys</Link></li>
                            <li><FontAwesomeIcon icon={faRightLong} /><Link to="/surveys/mysurveys"> My Surveys</Link></li>
                            <li><FontAwesomeIcon icon={faRightLong} /><Link to="/surveys/surveyhistory"> Survey History</Link></li>
                        </ul>
                    </div>

                </>
            }
        </>
    )
}

export default Sidebar;