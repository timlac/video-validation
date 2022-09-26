import ReactDOM from "react-dom/client";
import {useState} from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import VideoPage from "./VideoPage";
import UserForm from "./UserForm";

import { UserContext } from "./Context";
import VideoExample from "./VideoExample";

export default function App() {

    const [user, setUser] = useState({
        email: "",
        gender: ""
    });

    return (
        <UserContext.Provider value={ {user, setUser} }>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserForm />} />
                    <Route path="/VideoPage" element={<VideoPage />} />
                    <Route path="/VideoExample" element={<VideoExample />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);