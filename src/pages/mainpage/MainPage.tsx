import React from "react";
import Navbar from "../../component/navbar/NavBar";
import Footer from "../../component/footer/Footer";
import HelpDeskMainpage from "../../component/helpdesk/HelpDeskMainpage";

const MainPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <HelpDeskMainpage />
            <Footer />
        </div>
    );
};

export default MainPage;
