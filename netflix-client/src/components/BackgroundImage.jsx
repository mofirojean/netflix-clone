import background from "../assets/login.jpg"
import styled from "styled-components";

export function BackgroundImage() {
    return (
        <Container>
            <img src={background} alt="background-image" />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    
    img {
        height: 100vh;
        width: 100vw;
    }
`;