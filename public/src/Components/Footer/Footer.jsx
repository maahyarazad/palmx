import React, { useEffect } from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../../src/Assets/palmx-logo.jpeg'
const Footer = ({ footerData }) => {

    useEffect(() => {}, [footerData]);

    if (!footerData) {
        return null;
    }

    const getSocialIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return FaFacebook;
            case 'twitter':
                return FaTwitter;
            case 'linkedin':
                return FaLinkedin;
            case 'instagram':
                return FaInstagram;
            default:
                return null;
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-company">
                    <div className='logo-container-footer'>
                        <img src={logo} alt="Company Logo" className="footer-logo" />
                    </div>
                    
                </div>
                {/* <div className="footer-social">
                    <h4>Quick Links</h4>
                    <ul>
                        {footerData.navLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.path}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div> */}
                <div className="footer-social">
                    {/* <h4>Social Meida</h4> */}
                    <ul>
                        {/* {footerData.socialLinks.map((social) => {
                            const Icon = getSocialIcon(social.platform);

                            return (
                                <li key={social.platform}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                                        {Icon && <Icon size={20} style={{ marginRight: '8px' }} />}
                                        {social.platform}
                                    </a>
                                </li>
                            );
                        })} */}
                    </ul>
                </div>
                <div className="align-self-center d-flex footer-contact">
                    <p>{footerData.about}</p>
                    {/* <h4>Contact Us</h4> */}
                    {/* <p>Email: <a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a></p>
                    <p>Phone: <a href={`tel:${footerData.contact.phone}`}>{footerData.contact.phone}</a></p> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
