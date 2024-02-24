import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"; 
import AboutUs from "./pages/about/About";
import List from "./pages/list/List"; 
import Login from "./components/login/Login"; 
import User from "./pages/users/User";
import Register from "./pages/register/Register";
import NewSurveyCreate from "./pages/surveys/SurveyCreate"; 
import SingleSurvey from "./pages/surveys/SingleSurvey";
import SurveyPending from "./pages/surveys/SurveyPending";
import MySurveys from "./pages/surveys/MySurveys";
import SurveyOpened from "./pages/surveys/SurveysOpened";
import MySurveyHistory from "./pages/surveys/SurveyHistory";

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/surveys" element={<List/>} />
        <Route path="/surveys/all" element={<List/>} />
        <Route path="/surveys/:id" element={<SingleSurvey/>} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/user/:id" element={<User/>} />
        <Route path="/surveys/new" element={<NewSurveyCreate />} /> 
        <Route path="/surveys/pending" element={<SurveyPending />} />
        <Route path="/surveys/opened" element={<SurveyOpened />} />
        <Route path="/surveys/mysurveys" element={<MySurveys />} />
        <Route path="/surveys/surveyhistory" element={<MySurveyHistory/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
