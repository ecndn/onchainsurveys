import useFetch from "../../../hooks/useFetch"
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext"
import Sidebar from '../sidebar/sidebar';

const GetMySurveys = () => {

    const user = useContext(AuthContext);
 
    const created = user.user.username; 

    const { data, loading, error } = useFetch(`http://localhost:8800/api/surveys/getmysurvey/${created}`);

    const totalMySurveys = data.length;

    return (
        <div>
        <div className="userDetails">
            <div className="userContainer">
                <Sidebar _id={user.user === null ? null : user.user._id} username={user.user === null ? null : user.user.username} />

                <div className="content">
                    <div className="surveyConten">
                    <div style={{overflowx:"auto"}}>

                        {totalMySurveys === 0 ? 
                            <>
                            <p style={{color:'#111'}}>You have not created any polls. <a href="../surveys/new">Click here</a> to create.</p>
                            </> : 
                            
                            <>
                                    <table id="surveys">
                                 
                                 <tr>
                                     <th>Survey Name</th>
                                     <th>Created</th>
                                     <th>Start Date</th>
                                     <th>End Date</th>
                                     <th>Status</th> 
                                 </tr>
                                 
                                {data.map((x,i) => {
                                    
                                    return ( 
                                       
                                     <tr key={x._id}>
                                         <td><Link to={`/surveys/${x._id}`}>{x.surveyName}</Link></td>
                                         <td>{x.created}</td>
                                         <td>{x.startDate}</td>
                                         <td>{x.endDate}</td>
                                         <td>{x.status === 1 ? <FontAwesomeIcon style={{color:"limegreen"}} icon={faCheckDouble} /> : <FontAwesomeIcon style={{color:"#c31421"}} icon={faXmark} />  }</td> 
                                     </tr> 
                                    )
                                })}
                               
                             </table>
                            </>
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default GetMySurveys;