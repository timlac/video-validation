import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from "../Login/Login";
import useToken from "./useToken";
import MyLayout from "../MyLayout/MyLayout";

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <MyLayout>

                    </MyLayout>
            </BrowserRouter>
        </div>
    );
}
export default App;
