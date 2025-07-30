import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import MenuItem from "../homemenuitem/HomeMenuItem";
import { ethers } from "ethers";
import { menus } from "../../libs/menus";
import logo from "../../assets/images/Aeiforo-logo.png";
import { Avatar, Button, Modal, Tooltip } from "antd";
import "./HomeNavbar.scss";
import { ReactComponent as Profile } from '../../assets/images/profile.svg';
import { LogoutOutlined } from "@ant-design/icons";
import CustomButton from "../buttons/CustomButton";
import CustomModal from "../popup/CustomModel";
import { bgColor } from "../../style/ColorCode";
import { userInfo } from '../../utils/Options';


const HomeNavbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
        const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
     const location = useLocation();
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setMenuOpen(!menuOpen);
    };

        const disconnectWallet = () => {
        if (window.ethereum && window.ethereum.disconnect) {
            window.ethereum.disconnect();
        }
        if (window.ethereum && window.ethereum.provider && window.ethereum.provider.disconnect) {
            window.ethereum.provider.disconnect();
        }
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletProvider');
    };

        const handleLogout = () => {
        disconnectWallet();
        setIsDropdownOpen(!isDropdownOpen);
        navigate('/');
        localStorage.removeItem('record');
        localStorage.removeItem('activeTab');
        localStorage.removeItem('totalAnswered');
        localStorage.removeItem('answeredQuestions');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };
       const showLogoutConfirm = () => {
            Modal.confirm({
                title: 'Are you sure you want to logout?',
                content: 'You will be logged out and returned to the login page.',
                okText: 'Logout',
                cancelText: 'Cancel',
                onOk: handleLogout,
                onCancel: () => { },
            });
        };
    
        const handleOpenModal = () => {
            setIsModalVisible(true);
        };
    
        const handleCloseModal = () => {
            setIsModalVisible(false);
        };
        const goToProfile = () => {
        navigate('/profile');
    }; 
  const profile = (
        <div className="dropdown-menu">
            <div className="dropdown-item">
                <Avatar size={45} icon={<Profile />} onClick={handleOpenModal} />
                <div className="profile-details">
                    <span className="profile-name">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}</span>
                    <span className="profile-role">{userInfo?.user}</span>
                </div>
            </div>
            <div className="profile-content">
                <div className="profile" role="button" onClick={goToProfile}>
                    Profile
                </div>
            </div>
            <div className="dropdown-item logout" onClick={showLogoutConfirm}>
                <LogoutOutlined />
                <span>Logout</span>
            </div>
        </div>
    );

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const address = accounts;
                setWalletAddress(accounts[0]);
                localStorage.setItem("walletAddress", address);
                navigate("/landing_page");
            } catch (err) {
                console.error("User rejected the connection", err);
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
        }
    };

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        const handleScroll = () => {
            if (window.scrollY > 170) {
                navbar?.classList.add("is-sticky");
            } else {
                navbar?.classList.remove("is-sticky");
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="navbar" className="navbar2">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="logo" width={180} height={60} />
                </Link>

                <button
                    className={`navbar-toggle ${menuOpen ? "open" : ""}`}
                    onClick={toggleNavbar}
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>

                <nav className={`navbar-menu ${menuOpen ? "show" : ""}`}>
                    <ul className="navbar-nav">
                        {menus.map((menuItem) => (
                            <MenuItem key={menuItem.label} {...menuItem} />
                        ))}
                    </ul>
                    {location.pathname !== "/landing_page" ? (
                    <div className="navbar-actions">
                        {walletAddress ? (
                            <span className="wallet-address">
                                {walletAddress.slice(0, 6)}...
                                {walletAddress.slice(-4)}
                            </span>
                        ) : (
                            
                            <Button onClick={connectWallet} className="btn-connect">
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                    ) : (
    
                // <CustomButton
                //                 onClick={showLogoutConfirm}
                //                 label="Logout"
                //                 type="primary"
                //                 className="btn-logout"
                //             />
                <div className="profile-dropdown">
                 <div className="profile-details">
                        <span className="profile-name-out">{userInfo?.user}</span>
                        <span className="profile-role-out">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}</span>
                    </div>
                    <div className="nav-profile-pic">
                        <Tooltip trigger={'click'} color={bgColor} placement="rightTop" title={profile}>
                            <Avatar size={40} icon={<Profile />} />
                        </Tooltip>
                    </div>
                </div>
                    )}
                     <CustomModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                title={''}
                content={<Profile />}
                closable={false}
                footer={null}
            />
                </nav>
                
            </div>
        </header>
    );
};

export default HomeNavbar;
