import { LuSquareArrowUpRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import React, { useState, useRef, useEffect } from "react";
import Angel from "../../Assets/angel.png";
import difa from "../../Assets/difa.png";
import expert from "../../Assets/expert.png";
import WhiteReward from "../../Assets/whitereward.png";
import gec_mobile from "../../Assets/gec-mobile.png";
import ifza from "../../Assets/ifza.png";
import './ShowCases.css';
const ShowCases = () => {

    const [showIframe, setShowIframe] = useState(false);
    const iframeRef = useRef(null);
    const [frameSrc, setFrameSrc] = useState("");
   

    const handleOpen = (e) => {
        const srcValue = e.currentTarget.getAttribute("src");

        setFrameSrc(srcValue)

        setShowIframe(true);
    };

    const handleClose = () => {

        setShowIframe(false);
    };

    useEffect(() => {
        if (!showIframe) return;

        const handleClickOutside = (e) => {
            // If click target is NOT inside the iframe element, close it
            if (iframeRef.current && !iframeRef.current.contains(e.target)) {
                setShowIframe(false);
            }
        };

        // Listen for clicks in the parent document
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showIframe]);

    return (
        <>

            <div className="row w-100 show-case justify-self-center">
                                   <div className="col-lg-6 col-12">
                    <div className="show-case-container d-flex flex-column">
                        <img src={WhiteReward} alt="White Reward" />
                        <div className="info-panel d-flex">
                            <div className="align-self-end">

                                <p className="text-dark">
                                    <strong>

                                        Website
                                    </strong>
                                </p>
                                <a onClick={(e) => handleOpen(e)} className="a-button" src="https://www.whitereward.com/">
                                    <strong>

                                        White Reward
                                    </strong>
                                </a>
                            </div>

                            <div className="align-self-end">

                                <a target="_blank" href="https://www.whitereward.com/" className="a-link">
                                    <LuSquareArrowUpRight size={30} />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="col-lg-6 col-12">
                    <div className="show-case-container d-flex flex-column">
                        <img src={Angel} alt="Angel Bureau" />
                        <div className="info-panel d-flex">
                            <div className="align-self-end">

                                <p className="text-dark">
                                    <strong>

                                        Website
                                    </strong>
                                </p>
                                <a onClick={(e) => handleOpen(e)} className="a-button" src="https://www.angels-bureau.com/">
                                    <strong>

                                        Angel Bureau
                                    </strong>
                                </a>

                            </div>

                            <div className="align-self-end">

                                <a target="_blank" href="https://www.angels-bureau.com/" className="a-link">
                                    <LuSquareArrowUpRight size={30} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-lg-6 col-12">
                    <div className="show-case-container d-flex flex-column">
                        <img src={difa} alt="DIFA" />
                        <div className="info-panel d-flex">
                            <div className="align-self-end">

                                <p className="text-dark">
                                    <strong>

                                        Website
                                    </strong>
                                </p>
                                <a onClick={(e) => handleOpen(e)} className="a-button" src="https://https://www.difa.agency/">
                                    <strong>

                                        DIFA
                                    </strong>
                                </a>

                            </div>

                            <div className="align-self-end">

                                <a target="_blank" href="https://https://www.difa.agency/" className="a-link">
                                    <LuSquareArrowUpRight size={30} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="show-case-container d-flex flex-column">
                        <img src={expert} alt="Expert Circle" />
                        <div className="info-panel d-flex">
                            <div className="align-self-end">

                                <p className="text-dark">
                                    <strong>

                                        Website
                                    </strong>
                                </p>
                                <a onClick={(e) => handleOpen(e)} className="a-button" src="https://www.german-emirates-club.com/gec-events/expert">
                                    <strong>

                                        Expert Circle
                                    </strong>
                                </a>

                            </div>

                            <div className="align-self-end">

                                <a target="_blank" href="https://www.german-emirates-club.com/gec-events/expert" className="a-link">
                                    <LuSquareArrowUpRight size={30} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-lg-6 col-12">
                    <div className="show-case-container d-flex flex-column">
                        <img src={gec_mobile} alt="GEC Mobile" />
                        <div className="info-panel d-flex">
                            <div className="align-self-end">

                                <p className="text-dark">
                                    <strong>

                                        Mobile Application
                                    </strong>
                                </p>
                                <a className="a-button" src="https://play.google.com/store/apps/details?id=com.buenapublica.GECRewards&hl=en">
                                    <strong>

                                        GEC Mobile
                                    </strong>
                                </a>

                            </div>

                            <div className="align-self-end">

                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.buenapublica.GECRewards&hl=en" className="a-link">
                                    <LuSquareArrowUpRight size={30} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="show-case-container d-flex flex-column">
                        <img src={ifza} alt="IFZA Elite" />
                        <div className="info-panel d-flex">
                            <div className="align-self-end">

                                <p className="text-dark">
                                    <strong>
                                        Mobile Application
                                    </strong>
                                </p>
                                <a className="a-button" src="https://play.google.com/store/apps/details?id=com.root.ifza&hl=en">
                                    <strong>

                                        IFZA Elite
                                    </strong>
                                </a>

                            </div>

                            <div className="align-self-end">

                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.root.ifza&hl=en" className="a-link">
                                    <LuSquareArrowUpRight size={30} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div>
                <iframe
                    ref={iframeRef}
                    src={frameSrc || null}
                    title="Full Page Iframe"
                    className={`fullscreen-iframe ${showIframe ? "visible" : ""}`}
                />
                <button className={`close-iframe ${showIframe ? "visible" : ""}`} onClick={handleClose}>
                    <IoMdClose size={20} />
                </button>
            </div>

        </>


    )
}

export default ShowCases