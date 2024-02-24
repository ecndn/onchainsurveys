
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import moment from 'moment';
import Sidebar from '../sidebar/sidebar';

const Opened = () => {

    const user = useContext(AuthContext);


    const { data, loading, error } = useFetch(`http://localhost:8800/api/surveys/opened/1`)
    const right = moment(data.endDate).format("YYYY-MM-DD HH:mm:ss");
    const now = moment().format("YYYY-MM-DD hh:mm:ss");

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
                                        const right = moment(x.endDate).format("YYYY-MM-DD HH:mm:ss");
                                        if (now < right) {
                                            return (

                                                <tr>
                                                    <td><Link to={`/surveys/${x._id}`}>{x.surveyName}</Link></td>
                                                    <td>{x.created} </td>
                                                    <td>{x.startDate} </td>
                                                    <td>{x.endDate}</td>
                                                    <td>{x.status === 1 ? <FontAwesomeIcon style={{ color: "limegreen" }} icon={faCheckDouble} /> : <FontAwesomeIcon style={{ color: "#c31421" }} icon={faXmark} />}</td>
                                                </tr>
                                            )
                                        }

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

export default Opened;