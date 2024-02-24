import React from 'react';
import Navbar from '../../components/navbars/Navbar';
import Footer from '../../components/footer/Footer';  
import NewSurveyCreate from '../../components/surveys/new/NewSurvey';

const Surveys = () => {
    return (
        <div>
            <Navbar />
            <NewSurveyCreate />
            <Footer />
        </div>
    )
}

export default Surveys;