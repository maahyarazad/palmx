
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './Pages/About';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Components/Navbar/Navbar';
import BackToTop from './Components/BackToTop/BackToTop';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Services from './Pages/Services';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticleJsContainer from './Components/ParticleJsContainer/ParticleJsContainer';
import './App.css';
const App = () => {
    const [siteData, setSiteData] = useState(null);
    const [language, setLanguage] = useState('EN');
    const [sessionId, setSessionId] = useState(null);


    const server_endpoint = import.meta.env.VITE_SERVER_API_URL;
    useEffect(() => {
        axios.get(`${server_endpoint}/api/site-data?lang=${language}`)
            .then((response) => {

                setSiteData(response.data);

            })
            .catch((error) => {
                console.error('Error fetching footer data:', error);
            });
    }, [language]);

    useEffect(() => {}, [siteData]);

    useEffect(() => {
        let guid = localStorage.getItem('session-guid');
        if (!guid) {
            guid = uuidv4();
            localStorage.setItem('session-guid', guid);
        }
        setSessionId(guid);
    }, []);

    useEffect(() => {
    if (sessionId) {
        axios.defaults.headers.common['X-Session-ID'] = sessionId;
    }
    }, [sessionId]);


    useEffect(() => {
        document.title = "PalmX Software";
    }, []);


    const handleLanguageChange = (value) => {
       setLanguage(value);
    }

    if (!siteData) {
        return <div>Loading blueprint...</div>;
    }


    return (
        <BrowserRouter>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        
            <Navbar onLanguageChange={handleLanguageChange} 
                            navbarLinks={siteData.navLinks}
                            siteData={siteData.getStarted}
                            currentlanguage={language} 
                            companyName={siteData.companyName}/>
            <ParticleJsContainer></ParticleJsContainer>
            <Routes>
                <Route path="/" element={<Home siteData={siteData} />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
            </Routes>
            <Footer footerData={siteData.footer} />
            <BackToTop />
        </BrowserRouter>
    );

};

export default App;