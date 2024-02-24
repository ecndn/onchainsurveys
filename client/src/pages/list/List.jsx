import React from 'react';
import Navbar from '../../components/navbars/Navbar'; 
import Footer from '../../components/footer/Footer';
import SurveysAll from '../../components/surveys/list/list';


const List = () => {
    return (
        <div>
            <Navbar />
            <SurveysAll />
            <Footer />
        </div>
    )
}

export default List;