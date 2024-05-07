import styled from "styled-components";
import {BackgroundImage} from "../components/BackgroundImage.jsx";
import Header from "../components/Header.jsx";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import {firebaseAuth} from "../utils/firebase.config.js";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleLogin = async () => {
        try {
            const {email, password } = formData
            await signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((user) => {
                    if (user) console.log(user)
                    navigate("/")
                })
        } catch (error) {
            const code = error.code;
            const message = error.message;
            console.error("code: ", code, "\nmessage: ", message)
        }
    }

    /* you can also use the
    * onAuthStateChanged() hook to perform actions after the responses has been sent
    * */

    return (
        <Container>
            <BackgroundImage />
            <div className="content">
                <Header />
                <div className="form-container flex flex-col gap-8 items-center justify-center">
                    <div className="form p-8 h-[85vh] w-[25vw] gap-8 flex flex-col items-center justify-center">
                        <div className="signup p-10 text-center">
                            <div className="title">
                                <h3 className="font-bold text-2xl mb-4 rounded-xl">Login</h3>
                            </div>
                            <div className="container gap-4 flex flex-col text-black">
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    name="email"
                                />
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    name="password"
                                />
                                <button onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    overflow: hidden;

    .content {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: 100vw;
        display: grid;

        .form-container {
            .form {
                .signup {
                    background-color: #000000b0;
                }
                .container input {
                    padding: 0.5rem 1rem;
                    border-radius: 0.2rem;
                }
            }
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
