import './all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Sidebar from '../sidebar/sidebar'

const List = () => {
 
    const user = useContext(AuthContext); 

    const { data } = useFetch(`http://localhost:8800/api/surveys/`)
 
    return (
        <div>
            <div className="userDetails">
                <div className="userContainer">
             
                    <Sidebar _id={user.user === null ? null : user.user._id} username={user.user === null ? null : user.user.username} />
 
                    <div className="content">
                        <div className="surveyConten">
                            <div style={{ overflowx: "auto" }}>
                                <table id="surveys">

                                    <tr>
                                        <th>Survey Name</th>
                                        <th>Created</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                    </tr>
                                    {data.map((x, i) => {
                                        return (
                                            <tr>
                                                <td><Link to={`/surveys/${x._id}`}>{x.surveyName}</Link></td>
                                                <td>{x.created}</td>
                                                <td>{x.startDate}</td>
                                                <td>{x.endDate}</td>
                                                <td>{x.status === 1 ? <FontAwesomeIcon style={{ color: "limegreen" }} icon={faCheckDouble} /> : <FontAwesomeIcon style={{ color: "#c31421" }} icon={faXmark} />}</td>
                                            </tr>
                                        )
                                    })}

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;