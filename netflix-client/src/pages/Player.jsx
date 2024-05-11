import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/movie/BULLET_2014(360p).mp4"
import {useNavigate} from "react-router-dom";

export default function Player() {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="player w-screen h-screen">
                <div className="back absolute p-8">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <video src={video} autoPlay loop controls muted></video>
            </div>
        </Container>
    )
}

const Container = styled.div`
    .player {
        .back {
            z-index: 1;
            svg {
                font-size: 3rem;
                cursor: pointer;
            }
        }
    }
    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;