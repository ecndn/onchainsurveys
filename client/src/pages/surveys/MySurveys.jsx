import Navbar from "../../components/navbars/Navbar"
import Footer from "../../components/footer/Footer"
import GetMySurveys from "../../components/surveys/mysurveys/GetMySurveys";

const MySurveys = () => {
    return (
        <div>
            <Navbar />
            <GetMySurveys />
            <Footer />
        </div>
    )
}

export default MySurveys;