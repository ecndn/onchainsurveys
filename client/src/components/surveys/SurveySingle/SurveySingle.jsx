import "./surveysingle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faCheck, faCheckDouble, faCheckCircle, faTriangleExclamation, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import ProgressBar from "@ramonak/react-progress-bar";
import moment from 'moment';
import axios from 'axios';
import Sidebar from '../sidebar/sidebar';

const SurveySingle = () => {
    const user = useContext(AuthContext);
    const location = useLocation();
    const surveyId = location.pathname.split("/")[2];

    const { data } = useFetch(`http://localhost:8800/api/surveys/${surveyId}`);


    function userid() {
        if (user.user == null) {
            return null
        } else {
            return user.user._id;
        }
    }


    const getDataVotes = useFetch(`http://localhost:8800/api/votes/${userid()}`);


    const filtered = getDataVotes.data.filter(obj => {
        if (surveyId === obj.surveyId) {
            return obj.userId
        }
    });


    filtered && filtered[0]?.votes?.map((gg, ff) => {
        {
            Object.keys(gg).map((item, k) => {
                {
                    Object.keys(gg[item]).map((dd, ee) => {

                    })
                }
            })
        }
    })




    const [ratings, setRatings] = useState({});
    const [optionId, setOptionId] = useState();
    const [approve, setApprove] = useState(1);


    const handleChange = (e) => {
        setRatings((prev) => ({ ...prev, [e.target.name]: { [e.target.id]: e.target.value } }));

    }

    const rating = {
        ...ratings
    }
 

    // Sum Rating
    let sumRating = 0;
    data.anyOf && data.anyOf.map((item, i) => {
        item.Options && item.Options.items.map((it, k) => {

            const number = it.rating
            sumRating += number

        });
    })


    const timestamp = (date) => {
        var datum = Date.parse(date);
        return datum / 1000;
    }

    const right = moment(data.endDate).format("YYYY-MM-DD HH:mm:ss");
    const now = moment().format("YYYY-MM-DD hh:mm:ss");

    const handleClick = async e => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:8800/api/surveys/ratings/${surveyId}/${user.user._id}/`, rating);

            if (res.status === 200) alert("Your vote has been saved.");
            window.location.reload();

        } catch (error) {
            console.log(error)
        }

    }

    const handleClickApprove = async () => {
        //  e.preventDefault();

        const data = {
            status: approve
        }

        const res = await axios.put(`http://localhost:8800/api/surveys/${surveyId}/`, data);


        if (res.status == 200) {
            alert("Successful")
            window.location.reload();
        }


    }

    return (
        <div>
            {user.user === null ?
                <div className="userDetails">
                    <div className="userContainer">
                    <Sidebar _id={user.user === null ? null : user.user._id} username={user.user === null ? null : user.user.username} />
 
                        <div className="content">
                            <div className="surveyConten">
                                <h1 style={{ fontFamily: "Montserrat", fontSize: "30px", color: '#1a1a1a' }}>About Survey</h1>

                                <div className="itemDiv">Survey Name : {data.surveyName}</div>
                                <div className="itemDiv">Start Date : {data.startDate}</div>
                                <div className="itemDiv">End Date : {data.endDate}</div>
                                <div className="itemDiv">Approval : {data.status === 0 ? <> <FontAwesomeIcon style={{ color: "#c31421" }} icon={faTriangleExclamation} /> Awaiting approval by moderator. </> : <FontAwesomeIcon style={{ color: "limegreen" }} icon={faCheckDouble} />} </div>
                                {data.status === 0 && user.user.isAdmin === 1 ? <button onClick={handleClickApprove} className="loginButton">Approve</button> : ''}

                                <hr />

                                <div className="questionsBar">
                                    <h2 style={{ fontFamily: "Montserrat", fontSize: "20px", color: '#1a1a1a' }}>Survey Questions</h2>

                                    <div className="totalVotes"> {filtered.length < 1 ? '' : <>Total votes : {sumRating} </>}</div>
                                </div>

                                <div className="questions">
                                    <div style={{ color: 'black' }} className="questions">
                                        <form>
                                            {data.anyOf && data.anyOf.map((item, key) => {

                                                const keyOption = key;
                                                return (
                                                    <div>
                                                        <h3 style={{ fontFamily: 'Montserrat' }}>{item.question} </h3>

                                                        {item && item.Options.items.map((OptionName, OptionKey) => {

                                                            const ratingEnd = OptionName.rating * 100 / sumRating;
                                                            const OptionRating = OptionName.rating;
                                                            return (
                                                                <>
                                                                    <div style={{ margin: "10px 0" }} key={OptionName.rating} className="from-group">
                                                                        <label key={OptionName.rating} style={{ display: 'flex', justifyContent: 'flex-start', color: "#1a1a1a", marginBottom: 20 }}>

                                                                            {filtered && filtered[0]?.votes?.map((gg, ff) => {

                                                                                return (
                                                                                    <>
                                                                                        {
                                                                                            Object.keys(gg).map((item, k) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        {
                                                                                                            Object.keys(gg[item]).map((dd, ee) => {

                                                                                                                return (
                                                                                                                    <>
                                                                                                                        <div> {keyOption == item && OptionKey == dd ? <FontAwesomeIcon style={{ color: "#c31421" }} icon={faRightLong} /> : false} </div>
                                                                                                                    </>
                                                                                                                )
                                                                                                            })
                                                                                                        }
                                                                                                    </>
                                                                                                )

                                                                                            })
                                                                                        }
                                                                                    </>
                                                                                )

                                                                            })
                                                                            }

                                                                            {filtered.length > 0 ? false : <input disabled={data.status === 0 || now > right ? "disabled" : false} onChange={handleChange} name={keyOption} id={OptionKey} value={OptionName.rating + 1} type="radio" />} {OptionName.Option}
                                                                        </label>
                                                                        {now < right ?
                                                                            <>
                                                                                {filtered.length < 1 ? <>  </> : <> <ProgressBar style={{ marginTop: 10 }} bgColor="#c31421" completed={Math.trunc(ratingEnd)} /></>}

                                                                            </> :

                                                                            <>
                                                                                <ProgressBar style={{ marginTop: 10 }} bgColor="#c31421" completed={Math.trunc(ratingEnd)} />
                                                                            </>

                                                                        }
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                )
                                            })}

                                        </form>

                                        {now < right ?
                                            <>
                                                {data.status == 0 ? <> <FontAwesomeIcon style={{ color: "#c31421" }} icon={faTriangleExclamation} /> <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>Awaiting approval by moderator. </span> </>
                                                    :
                                                    <>
                                                        {filtered.length > 0 ? <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>You voted in this poll.</span> : <> <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>Please login to vote.</span>  </>}
                                                    </>
                                                }
                                            </>
                                            : <> <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>This survey has expired</span>  </>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="userDetails">
                    <div className="userContainer">
                        
                        <Sidebar _id={user.user === null ? null : user.user._id} username={user.user === null ? null : user.user.username} />
 
                        <div className="content">
                            <div className="surveyConten">
                                <h1 style={{ fontFamily: "Montserrat", fontSize: "30px", color: '#1a1a1a' }}>About Survey</h1>

                                <div className="itemDiv">Survey Name : {data.surveyName}</div>
                                <div className="itemDiv">Start Date : {data.startDate}</div>
                                <div className="itemDiv">End Date : {data.endDate}</div>
                                <div className="itemDiv">Approval : {data.status === 0 ? <> <FontAwesomeIcon style={{ color: "#c31421" }} icon={faTriangleExclamation} /> Awaiting approval by moderator. </> : <FontAwesomeIcon style={{ color: "limegreen" }} icon={faCheckDouble} />} </div>
                                {data.status === 0 && user.user.isAdmin === 1 ? <button onClick={handleClickApprove} className="loginButton">Approve</button> : ''}

                                <hr />

                                <div className="questionsBar">
                                    <h2 style={{ fontFamily: "Montserrat", fontSize: "20px", color: '#1a1a1a' }}>Survey Questions</h2>

                                    <div className="totalVotes"> {filtered.length < 1 ? '' : <>Total votes : {sumRating} </>}</div>
                                </div>

                                <div className="questions">
                                    <div style={{ color: 'black' }} className="questions">
                                        <form>
                                            {data.anyOf && data.anyOf.map((item, key) => {

                                                const keyOption = key;
                                                return (
                                                    <div>
                                                        <h3 style={{ fontFamily: 'Montserrat' }}>{item.question} </h3>

                                                        {item && item.Options.items.map((OptionName, OptionKey) => {

                                                            const ratingEnd = OptionName.rating * 100 / sumRating;
                                                            const OptionRating = OptionName.rating;
                                                            return (
                                                                <>
                                                                    <div style={{ margin: "10px 0" }} key={OptionName.rating} className="from-group">
                                                                        <label key={OptionName.rating} style={{ display: 'flex', justifyContent: 'flex-start', color: "#1a1a1a", marginBottom: 20 }}>

                                                                            {filtered && filtered[0]?.votes?.map((gg, ff) => {

                                                                                return (
                                                                                    <>

                                                                                        {
                                                                                            Object.keys(gg).map((item, k) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        {
                                                                                                            Object.keys(gg[item]).map((dd, ee) => {

                                                                                                                return (
                                                                                                                    <>
                                                                                                                        <div> {keyOption == item && OptionKey == dd ? <FontAwesomeIcon style={{ color: "#c31421" }} icon={faRightLong} /> : false} </div>
                                                                                                                    </>
                                                                                                                )
                                                                                                            })
                                                                                                        }
                                                                                                    </>
                                                                                                )

                                                                                            })
                                                                                        }
                                                                                    </>
                                                                                )

                                                                            })
                                                                            }

                                                                            {filtered.length > 0 ? false : <input disabled={data.status === 0 || now > right ? "disabled" : false} onChange={handleChange} name={keyOption} id={OptionKey} value={OptionName.rating + 1} type="radio" />} {OptionName.Option}

                                                                        </label>
                                                                        {now < right ?
                                                                            <>
                                                                                {filtered.length < 1 ? <>  </> : <> <ProgressBar style={{ marginTop: 10 }} bgColor="#c31421" completed={Math.trunc(ratingEnd)} /></>}

                                                                            </> :

                                                                            <>
                                                                                <ProgressBar style={{ marginTop: 10 }} bgColor="#c31421" completed={Math.trunc(ratingEnd)} />
                                                                            </>

                                                                        }

                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                )
                                            })}

                                        </form>

                                        {now < right ?
                                            <>
                                                {data.status == 0 ? <> <FontAwesomeIcon style={{ color: "#c31421" }} icon={faTriangleExclamation} /> <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>Awaiting approval by moderator. </span> </>
                                                    :
                                                    <>
                                                        {filtered.length > 0 ? <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>You voted in this poll.</span> : <> <button className="loginButton" onClick={handleClick}>Vote</button> </>}
                                                    </>
                                                }
                                            </>
                                            :
                                            <>
                                                <span style={{ fontFamily: 'Montserrat', color: "#c31421" }}>This survey has expired</span>

                                            </>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SurveySingle;