import styled from "styled-components";
import brand from "../assets/logo.png"
import {navItems} from "../data/constants.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {FaPowerOff, FaSearch} from "react-icons/fa";
import {signOut} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase.config.js";

// eslint-disable-next-line react/prop-types
export default function Navbar({ isScrolled }) {
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(firebaseAuth)
            .then(() => {
                navigate('/signup')
            })
            .catch(err => console.log(err))
    }
    return (
        <Container>
            <nav className={`flex justify-between items-center bg-transparent py-0 px-16 ${isScrolled ? "scrolled" : ""}`}>
                <div className="left flex gap-8 items-center">
                    <div className="brand flex items-center justify-center">
                        <img src={brand} alt="logo"/>
                    </div>
                    <ul className="links list-none gap-8 flex">
                        {
                            navItems.map(({name, link}, index) => (
                                <li key={index}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="right flex gap-2 items-center">
                    <div className={`search ${showSearch ? 'show-search' : ''}`}>
                        <button
                            onFocus={() => {
                                setShowSearch(true)
                            }} onBlur={() => {
                                if (!inputHover) setShowSearch(false)
                        }}>
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false);
                            }}
                        />
                    </div>
                    <button onClick={handleSignOut}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    )
}

const Container = styled.div`
    .scrolled {
        background-color: black;
    }
    
    nav {
        position: fixed;
        top: 0;
        height: 4rem;
        width: 100%;
        z-index: 2;
        transition: 0.3s ease-in-out;

        .left {
            .brand {
                img {
                    height: 4rem;
                }
            }

            .links li a {
                color: #ffffff;
                text-decoration: none;
            }
        }

        .right {
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;

                &:focus {
                    outline: none;
                }

                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }

            .search {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                padding: 0.2rem 0.2rem 0.2rem 0.5rem;
                
                button {
                    background-color: transparent;
                    
                    svg {
                        color: #ffffff;
                    }
                }
                input {
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.3s ease-in-out ;
                    background-color: transparent;
                    border: none;
                    color: #ffffff;
                    
                    &:focus {
                        outline: none;
                    }
                }
            }
            .show-search {
                border: 1px solid white;
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.6);
                
                input {
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                    padding: 0.3rem;
                }
            }
        }
    }
`;