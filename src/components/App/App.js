import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import VideoForm from "../VideoForm/VideoForm";
import Login from "../Login/Login";
import useToken from "./useToken";

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<VideoForm/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
