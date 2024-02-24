import useFetch from "../../../hooks/useFetch"
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext" 
import Sidebar from "../sidebar/sidebar";

const SurveyHistory = () => {

    const user = useContext(AuthContext);
 
    function userid() {
        if (user.user == null) {
            return null
        } else {
            return user.user._id;
        }
    }
  
    const getDataVotes = useFetch(`http://localhost:8800/api/votes/${userid()}`);


    const filtered = getDataVotes.data.filter(obj => {
        return obj.userId
    });




    const datax = useFetch(`http://localhost:8800/api/surveys`);

    /*   filtered.map((x, i) => {
           datax.data.filter(obj => {
               if (obj._id == filtered[i].surveyId) {
                   return obj
               }
           })
       })
   */


    const totalMySurveys = datax.length;


    return (
        <div>
            <div className="userDetails">
                <div className="userContainer">
                    <Sidebar _id={user.user === null ? null : user.user._id} username={user.user === null ? null : user.user.username} />

                    <div className="content">
                        <div className="surveyConten">
                            <div style={{ overflowx: "auto" }}>


                                {totalMySurveys === 0 ?
                                    <>
                                        <p>You have not created any polls. <a href="../surveys/new">Click here</a> to create.</p>
                                    </>
                                    :
                                    <>
                                        <table id="surveys">

                                            <tr>
                                                <th>Survey Name</th>
                                                <th>Created</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Status</th>
                                            </tr>
                                            {
                                                filtered && filtered.map((x, i) => {
                                                    return (
                                                        <>
                                                            {datax.data
                                                                .filter((obj) => {
                                                                    return obj._id == filtered[i].surveyId;
                                                                })
                                                                .map((item, i) => (

                                                                    <tr key={item._id}>
                                                                        <td><Link to={`/surveys/${item._id}`}>{item.surveyName}</Link></td>
                                                                        <td>{item.created}</td>
                                                                        <td>{item.startDate}</td>
                                                                        <td>{item.endDate}</td>
                                                                        <td>{item.status === 1 ? <FontAwesomeIcon style={{ color: "limegreen" }} icon={faCheckDouble} /> : <FontAwesomeIcon style={{ color: "#c31421" }} icon={faXmark} />}</td>
                                                                    </tr>
                                                                ))} 
                                                        </>
                                                    )


                                                })  }
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

export default SurveyHistory;