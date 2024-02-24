import './new.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useEffect } from 'react';
import Form from "@rjsf/core";
import moment from 'moment'

 
const NewSurveyCreate = () => {

    const { user } = useContext(AuthContext);
    const navigation = useNavigate();
    const [startDate, setStartDate] = useState(new Date(), 24, 0);
    const [endDate, setEndDate] = useState(new Date());
    const [surveyName, setSurveyName] = useState('');
    const [question, setQuestion] = useState('');
    const [inputList, setInputList] = useState([{ surveyName: "", created: "", startDate: '', endDate: '', properties: [] }]);
    const [optionList, setOptionList] = useState([]);
  
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };


    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };


    const handleAddFormClick = () => {
        setInputList([...optionList, { optionName: "" }]);
    };

    const handleAddClick = () => {
        setOptionList([...inputList, { optionName: "" }]);
    }
  
    const schema = { 
        "type": "object",
        "title": " ",
        "properties": {
            "surveyName": {
                "type": "string",
                "title": "Survey Name",
                "description": "Please enter your survey name"
            },
            "startDate": {
                "type": "string",
                "title": "Start Date",
                "format": "date-time",
                "description": "Please enter your survey start date"
            },
            "endDate": {
                "type": "string",
                "title": "End Date",
                "format": "date-time",
                "description": "Please enter your survey end date"
            },
            "user_id": {
                "type": "string",
                "default": user._id,

            },
            "created": {
                "type": "string",
                "default": user.username
            },
            "anyOf": {
                "type": "array",
                "default": [],
                "title": " Enter your question",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {},
                        "question": {
                            "type": "string",
                            "title": "Enter your question?",
                        },
                        "Options": {
                            "title": "",
                            "type": "object",
                            "properties": {
                                "type": {},
                                "items": {
                                    "type": "array",
                                    "title": "Options", 
                                    "items": {
                                        "anyOf": [
                                            {
                                                "properties": {
                                                    "Option": {
                                                        "type": "string", 
                                                        "minLength": 1,
                                                        "description": "Please add a new option."
                                                    },
                                                    "rating": {
                                                        "type": "number", 
                                                        "default":0
                                                    }
                                                },
                                                "required": [
                                                    "Option"
                                                  ]
                                                
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    const uiSchema = {

        'ui:submitButtonProps': {
            showButton: true,
            buttonText: 'submit',

        },
        user_id: { 'ui:widget': 'hidden' },
        created: { 'ui:widget': 'hidden' },
        'option_id': {
            'ui:label': "False",
            'classNames': 'hidden-title'
        },
        anyOf: {
            items: {
                Options: {
                    items: {
                        items: { 
                            rating: {'ui:widget': 'hidden'}
                        }
                    }
                }
            }
        } 
    }
   // const log = (type) => console.log.bind(console, type);
 

    // const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);

    const [surveys, setSurveys] = useState({
        surveyName: '',
        startDate: '',
        endDate: '',
        properties: []
    })


    const onSubmit = async ({ formData }, e) => {
        e.preventDefault();
  
        console.log(formData);

        const res = await axios.post('http://localhost:8800/api/surveys', formData);

        if (res.status === 200) alert("The survey has been successfully created.");

        navigation("/surveys/mysurveys")
 
    }

  
    const enabled = surveys.surveyName;

    const handleClick = async e => {
 

        const createSurvey = {
            surveyName: "fsd",
            created: 'mec2',
            question: 'fsd'

        }

        const res = await axios.post('http://localhost:8800/api/surveys', createSurvey);


        console.log(res)
    }

    return (
        <div className="userDetails" >
            <div className="userContainer">
                <div className="sidebar">
                    <h2>Welcome {user.username}</h2>
                    <ul>
                        <li><FontAwesomeIcon icon={faRightLong} /><Link to={`/user/${user._id}`}> My Profile</Link></li>
                        <li><FontAwesomeIcon icon={faRightLong} /><Link to="#"> Update Password</Link></li>
                        <li><FontAwesomeIcon icon={faRightLong} /><Link to="/surveys/mysurveys"> My Surveys</Link></li>
                        <li><FontAwesomeIcon icon={faRightLong} /><Link to="#"> Survey History</Link></li>
                    </ul>
                </div>

                <div style={{ color: "black" }} className="content">
                    <h1 style={{ fontFamily: "Montserrat", margin: "20px 0", color: "#1a1a1a" }}>New Survey </h1>

                    {

                        <Form schema={schema} 
                            onSubmit={onSubmit}
                            uiSchema={uiSchema} 

                        >
                        </Form>

                    } 
                   
                </div>
            </div>
        </div >
    )
}

export default NewSurveyCreate