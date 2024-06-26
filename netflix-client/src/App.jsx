import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Netflix from "./pages/Netflix.jsx";
import Player from "./pages/Player.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact index element={<Netflix />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/player" element={<Player />} />
            <Route exact path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
