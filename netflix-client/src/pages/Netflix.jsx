import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import bgImage from "../assets/home.jpg"
import movieLogo from "../assets/homeTitle.webp";
import {FaPlay} from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchMovie, getGenres} from "../store/index.js";

export default function Netflix() {
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

    useEffect(() => {
        dispatch(getGenres())
    }, []);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovie({type: 'all'}));
    }, );

    /* This can cause a side effect, maybe use useEffect */
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset !== 0);
        return () => (window.onscroll = null);
    }
    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img
                    src={bgImage}
                    alt="back-ground-image"
                    className="background-image"
                />
                <div className="container-d">
                    <div className="logo">
                        <img src={movieLogo} alt="movie-logo" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex justify-center items-center" onClick={() => navigate('/player')}>
                            <FaPlay/> Play
                        </button>
                        <button className="flex justify-center items-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    background-color: black;

    .hero {
        position: relative;

        .background-image {
            filter: brightness(60%);
        }

        img {
            height: 110vh;
            width: 100vw;
        }

        .container-d {
            position: absolute;
            bottom: 10rem;

            img {
                width: 100%;
                height: 100%;
                margin-left: 5rem;
            }

            .buttons {
                margin: 4rem 5rem;
                gap: 2rem;

                button {
                    font-size: 1.4rem;
                    background-color: white;
                    color: black;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem 2.4rem 0.5rem 2rem;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s ease-in-out;
                    
                    &:hover {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2) {
                        background-color: rgba(109, 109, 110, 0.8);
                        color: white;
                        
                        svg {
                            font-size: 1.8rem;
                        }
                    }
                }
            }
        }
    }
`
