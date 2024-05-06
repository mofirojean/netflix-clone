import logo from "../assets/logo.png"
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function Header(props) {
    /* for navigation */
    const navigate = useNavigate()
    return (
        <Container className="flex items-center justify-between">
            <div className="logo">
                <img src={logo} alt="netflix-logo" />
            </div>
            <button onClick={() => navigate(props.login ? "/login" : "/signup")}>{props.login ? "Log In" : "Sign Up"}</button>
        </Container>
    )
}

const Container = styled.div`
    padding: 0 4rem;
    .logo {
        img {
            height: 5rem;
        }
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        color: #fff;
        border-radius: 0.2rem;
        cursor: pointer;
        font-weight: bolder;
        font-size: 1.05rem;
    }
`;