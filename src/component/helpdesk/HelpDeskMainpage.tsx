import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HelpDesk.scss";

import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";

const HelpDeskMainpage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        AOS.init({ once: true });
        
        const address = localStorage.getItem("walletAddress") || "";
        setWalletAddress(address);
        
        const servicesData = [
            {
                icon: icon3,
                title: "BRSR",
                id: "1",
                shortText: "Digitize your BRSR reporting with streamlined workflows and real-time stakeholder access.",
                viewDetails: "#",
                aosDelay: "300",
                url: `${process.env.REACT_APP_BRSR_URL}/dashboard/?wallet=${address}`,
            },
            {
                icon: icon2,
                title: "GRI",
                id: "2",
                shortText: "Easily align with GRI Standards through guided inputs and smart contract-based validations.",
                viewDetails: "#",
                aosDelay: "200",
                url: `${process.env.REACT_APP_GRI_URL}/dashboard?wallet=${address}`,
            },
            {
                icon: icon1,
                id: "3",
                title: "SSSS",
                shortText: "Manage supplier data, performance, and ESG risk—all in one secure, blockchain-backed platform.",
                viewDetails: "#",
                aosDelay: "100",
                url: `${process.env.REACT_APP_SSS_URL}/dashboard?wallet=${address}`,
            },
        ];
        
        setServices(servicesData);
    }, []);

    const handleClick = (url: string) => {
        window.location.href = url;
    };

    return (
        <div className="helpdesk-section ptb-100">
            <div className="container">
                <div className="section-title">
                    <h2>Empowered customers, efficient workforce,</h2>
                    <h1>Direct Business Impact</h1>
                    <p className="footer__description">Our suite of products are designed to deliver exceptional value for our customers,</p>
                    <p className="footer__description">minus typical software complexities and expenses.</p>
                </div>

                <div className="row">
                    {services.map((item, i) => (
                        <div
                            className="col"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={item.aosDelay}
                            key={item.id}
                            onClick={() => handleClick(item.url)}
                        >
                            <div className="helpdesk-card">
                                <div className="icon">
                                    <img src={item.icon} alt="icon" />
                                    <p>{item.shortText}</p>
                                </div>
                                <h3 className="link-btn">{item.title} <i className="fa-solid fa-angle-right"></i></h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpDeskMainpage;