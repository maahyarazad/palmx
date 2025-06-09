import { LuSquareArrowUpRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import Angel from "../../Assets/angel.png";
import React, { useState, useRef, useEffect } from "react";
import WhiteReward from "../../Assets/whitereward.png";
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

            <div className="d-flex w-100 show-case">
                <div className="show-case-container d-flex flex-column">
                    <img src={Angel} alt="Angel Logo" />
                    <div className="info-panel d-flex">
                        <div className="align-self-end">

                            <p> Website</p>
                            <a onClick={(e) => handleOpen(e)} className="a-button" src="https://www.angels-bureau.com/">
                                Angel Bureau
                            </a>

                        </div>

                        <div className="align-self-end">

                            <a target="_blank" href="https://www.angels-bureau.com/" className="a-link">
                                <LuSquareArrowUpRight size={30} />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="show-case-container d-flex flex-column">
                    <img src={WhiteReward} alt="White Reward" />
                    <div className="info-panel d-flex">
                        <div className="align-self-end">

                            <p> Website</p>
                            <a onClick={(e) => handleOpen(e)} className="a-button" src="https://www.whitereward.com/">
                                White Reward
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