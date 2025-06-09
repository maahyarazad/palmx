import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './Navbar.css';

// React Component
import Burger from '@animated-burgers/burger-rotate'
// don't forget the styles
import '@animated-burgers/burger-rotate/dist/styles.css'
import logo from '../../Assets/palmx-logo.jpeg'


const Navbar = ({ companyName, navbarLinks, siteData , onLanguageChange, currentlanguage }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState(currentlanguage);
    const [scrolled, setScrolled] = useState(false);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [pendingScrollKey, setPendingScrollKey] = useState(null);
   
    // Toggle the mobile menu
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const GetStarted = (e) => {
        e.preventDefault();

        if (location.pathname !== '/') {
            navigate('/', { replace: false });
            setShouldScroll(true); // set a flag to scroll after navigation
        } else {
            scrollToForm();
        }
    };

    // Trigger scroll after route change
    useEffect(() => {
        if (shouldScroll && location.pathname === '/') {
            const timeout = setTimeout(() => {
                scrollToForm();
                setShouldScroll(false); // reset
            }, 300); // delay (adjust if needed)

            return () => clearTimeout(timeout);
        }
    }, [location.pathname, shouldScroll]);

    const scrollToForm = () => {
        const element = document.querySelector("section.request-form-section");
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });

            const menu = document.querySelector(".mobile-menu.open");
            if (menu) {
                // menu.classList.remove("open");
                setMenuOpen(false);
            }
        }
    };


    const switchLanguage = () => {
        const newLang = language === 'EN' ? 'DE' : 'EN';
        setLanguage(newLang);

        if (onLanguageChange) {
            onLanguageChange(newLang);
        }
    };



  const handleScroll = (e, key) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      setPendingScrollKey(key); // Save scroll target
      navigate('/', { replace: false }); // Navigate first
    } else {
      scrollToSection(key); // Scroll immediately
    }

    setMenuOpen(false);
  };

  // Wait for navigation to complete, then scroll
  useEffect(() => {
    if (pendingScrollKey && location.pathname === '/') {
      const timeout = setTimeout(() => {
        scrollToSection(pendingScrollKey);
        setPendingScrollKey(null); // Reset
      }, 300); // Adjust delay if needed

      return () => clearTimeout(timeout);
    }
  }, [location.pathname, pendingScrollKey]);

  const scrollToSection = (key) => {
    const targetElement = document.getElementById(`section-${key}`);
    if (targetElement) {
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

    useEffect(() => { }, [companyName, navbarLinks]);



    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    if (!navbarLinks || !companyName) return null

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-section-left">
                <div className="logo-container-header">
                    {/* {companyName && companyName} */}
                    <img src={logo} alt="Company Logo" className="header-logo" />
                </div>
            </div>

            <div className="navbar-section-middle">

                <button className={`menu-toggle ${scrolled ? 'scrolled' : ''}`} aria-label="Toggle menu">
                    <Burger isOpen={menuOpen} direction="right" onClick={toggleMenu}>

                    </Burger>
                </button>



                {/* Desktop Nav Links */}
                <ul className="navbar-links desktop-only">
                    {navbarLinks?.map((link) => (
                        <li key={link.path}>
                            {/* <Link to={link.path}>{link.label}</Link> */}

                            <Link onClick={(e) => handleScroll(e, link.id)}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-section-right desktop-only">
                <div className="lang-switch">
                    <label className="switch">
                        <input type="checkbox" onChange={switchLanguage} checked={language === 'DE'} />
                        <span className="slider" />
                    </label>
                    <span className="lang-label">{language}</span>
                </div>
                <button className="btn btn-primary-contrast" onClick={GetStarted} type="button">{siteData.getStartedNow}</button>
            </div>

            {/* Slide-out Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}>
                <ul className="mobile-links">
                    {navbarLinks?.map((link) => (
                        <li key={link.path}>
                            <Link onClick={(e) => handleScroll(e, link.id)}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="mobile-lang-switch">
                    <label className="switch">
                        <input type="checkbox" onChange={switchLanguage} checked={language === 'DE'} />
                        <span className="slider" />
                    </label>
                    <span className="lang-label">{language}</span>
                </div>
                <button
                    type="button"
                    className="get-started mobile"
                    onClick={GetStarted}
                >
                    {siteData.getStartedNow}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
