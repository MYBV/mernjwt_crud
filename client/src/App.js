//#####################################################################################
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Pets } from "./components/Pets";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { useUser } from "./context/UserContext";
//#####################################################################################

//#####################################################################################
axios.defaults.baseURL = "http://localhost:5000";
//#####################################################################################

//#####################################################################################
function App() {
    const { user } = useUser();
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    const Public = ({ children }) => {
        return !user.login ? children : <Navigate to="/pets" />;
    };

    const Private = ({ children }) => {
        return user.login ? children : <Navigate to="/" />;
    };

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Public>
                            <Login />
                        </Public>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Public>
                            <Register />
                        </Public>
                    }
                />
                <Route
                    path="/pets"
                    element={
                        <Private>
                            <Pets />
                        </Private>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
//#####################################################################################

//#####################################################################################
export default App;
//#####################################################################################
