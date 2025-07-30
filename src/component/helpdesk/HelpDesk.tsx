import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HelpDesk.scss";

import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";

import { useEffect } from "react";

const servicesData = [
    {
        icon: icon1,
        title: "Supplier Management",
        shortText:
            "All disclosures are timestamped and locked on the blockchain, ensuring transparency and audit-readiness.",
        viewDetails: "#",
        aosDelay: "100",
        url: `${process.env.REACT_APP_SUPPLIER_MANAGEMENT_URL}/dashboard`,
    },
    {
        icon: icon2,
        title: "GRI Report",
        shortText:
            "Smart contracts validate inputs against BRSR Standards to prevent greenwashing or human error.",
        viewDetails: "#",
        aosDelay: "200",
        url: `${process.env.REACT_APP_GRI_URL}/dashboard`,

    },
    {
        icon: icon3,
        title: "BRSR Report",
        shortText:
            "Give investors, auditors, and regulators instant, permissioned access to sustainability reports.",
        viewDetails: "#",
        aosDelay: "300",
        url: `${process.env.REACT_APP_BRSR_URL}/dashboard`,

    },
   
];

const HelpDesk: React.FC = () => {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);
const handleClick = (url:string) => {
  window.location.href = `${url}`;
};

    return (
        <div className="helpdesk-section ptb-100">
            <div className="container">
                <div className="section-title">
                    <h2>Why Blockchain ?</h2>
                </div>

                <div className="row">
                    {servicesData.map((item, i) => (
                        <div
                            className="col"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={item.aosDelay}
                            key={i}
                            onClick={() => handleClick(item?.url)}
                        >
                            <div className="helpdesk-card">
                                <div className="icon">
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <h3  className="link-btn">{item.title} <i className="fa-solid fa-angle-right"></i></h3>
                               
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpDesk;
