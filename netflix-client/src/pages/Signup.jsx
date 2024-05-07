import styled from "styled-components";
import {BackgroundImage} from "../components/BackgroundImage.jsx";
import Header from "../components/Header.jsx";
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {firebaseAuth} from "../utils/firebase.config.js";
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ''
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

    const handleSubmit = async () => {
        try {
            const {email, password } = formData
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
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
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
                <Header login />
                <div className="body flex flex-col items-center justify-center m-0 p-0">
                    <div className="text font-bold flex align-middle items-center flex-col">
                        <h1 className="text-6xl px-[23rem] sm:px-[10rem] lg:px-[20rem] text-center">Unlimited movies, TV shows and more</h1>
                        <h4 className="text-2xl">Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or start membership</h6>
                    </div>
                    <div className="form">
                        <input
                            type="email"
                            onChange={handleChange}
                            placeholder="Email Address"
                            name="email"
                        />
                        {showPassword &&
                            <input
                                type="password"
                                onChange={handleChange}
                                placeholder="Password"
                                name="password"
                            />
                        }
                        {!showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>}
                    </div>
                    {showPassword && <button onClick={handleSubmit}>Sign Up</button>}
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
        grid-template-rows: 15vh 85vh;

        .body {
            gap: 1rem;

            .text {
                gap: 1rem;
            }

            .form {
                display: grid;
                grid-template-columns: ${({showPassword}) => showPassword ? "1fr 1fr" : "2fr 1fr"};
                width: 60%;

                input {
                    color: black;
                    padding: 1rem;
                    font-size: 1.05rem;
                    border: 1px solid rgba(0, 0, 0, 0.1);

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    border-radius: 0;
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
