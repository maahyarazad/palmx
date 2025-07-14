import { useCallback, useEffect, useState, useRef } from "react";
import { loadFull } from "tsparticles";
import bgDesktop from '../../../src/Assets/bg-new.png'
import bgMobile from '../../../src/Assets/bg-1.png'
const ParticleJsContainer = ({ children }) => {


    const containerRef = useRef(null);
    const directionRef = useRef(1);


    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);


    const [background, setBackground] = useState(bgDesktop);

    useEffect(() => {
        const updateBackground = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                setBackground(bgMobile);
            } else {
                setBackground(bgDesktop);
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);

        return () => window.removeEventListener("resize", updateBackground);
    }, []);


    // Handle parallax effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth <= 768) {
                if (!containerRef.current) return;
                containerRef.current.style.backgroundSize = '100% 100%';
                // containerRef.current.style.backgroundSize = 'contain';
            } else {
                if (!containerRef.current) return;

                const scrollTop = window.scrollY || window.pageYOffset;

                // Adjust these values to control parallax strength and direction
                const maxShift = 50; // max px to move horizontally
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;

                // Calculate horizontal shift percentage based on scroll progress (0 to 1)
                const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

                // Calculate horizontal position (0 to maxShift px)
                const posX = scrollPercent * maxShift;

                // Update backgroundPosition
                containerRef.current.style.backgroundSize = `${100 + posX}% auto`;
            }




        };

        window.addEventListener("scroll", handleScroll);

        // Initialize position on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef}
            style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                backgroundImage: `url(${background})`,
                // backgroundSize: "120% auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 center",
                zIndex: -1,
                top: 0,
                left: 0,
            }}>
            {/* <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "transparent"
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push"
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse"
                            },
                            resize: true
                        },
                        modes: {
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: "#ffffff"
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce"
                            },
                            random: false,
                            speed: 1,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000
                            },
                            value: 120
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: { min: 1, max: 4 }
                        }
                    },
                    detectRetina: true
                }}
            /> */}
        </div>

    );
};

export default ParticleJsContainer;
